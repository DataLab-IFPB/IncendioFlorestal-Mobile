import AsyncStorage from '@react-native-async-storage/async-storage';
import { call, put } from '@redux-saga/core/effects';
import axios from 'axios';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import moment from 'moment';
import { takeLatest } from 'redux-saga/effects';
import { DB_URI_PROD } from '../../config/keys';
import { UPLOAD_TYPE, USER_REGISTRATION } from '../../constants/keys';
import {
  fetchAddEvidenceFail,
  fetchAddEvidenceSuccess,
  fetchFilterIndicesFail,
  fetchFilterIndicesSuccess,
  fetchIndicesIncendiosFail,
  fetchIndicesIncendiosSuccess,
  fetchRemoveEvidenceFail,
  fetchRemoveEvidenceSuccess,
  fetchSaveIndiceFail,
  fetchSaveIndiceSuccess,
} from './fire-indices-action';
import {
  FETCH_ADD_EVIDENCE,
  FETCH_FILTER_INDICES_INCENDIOS,
  FETCH_INDICES_INCENDIOS,
  FETCH_REMOVE_EVIDENCE,
  FETCH_SAVE_INDICE,
} from './fire-indices-types';

const COLECTION_NAME = 'fires';
const MEDIA_TYPE = 'json';
const DAYS_TO_CALCULATE_INDICES = 1;

// pega a data atual e faz o calculo para criar duas datas, a inicial e a final
// a data inicial é a data atual - 5 dias
const generateDate = () => {
  const date = new Date();
  return {
    startAt: `${date.getFullYear()}-${date.getMonth() < 10 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() < 10 ? '0' : ''}${date.getDate() - DAYS_TO_CALCULATE_INDICES
    }`,
    endAt: date.toLocaleDateString('en-CA'),
  };
};

// filtra os indices de acordo com a data passada por parametro
const generateDateFilter = (lengthDays) => {
  const date = new Date();

  return {
    startAt: `${date.getFullYear()}-${date.getMonth() < 10 ? '0' : ''}${date.getMonth() + 1}-${
      lengthDays === 2
        ? date.getDate() - DAYS_TO_CALCULATE_INDICES
        : date.getDate()
    }`,
    endAt: date.toLocaleDateString('en-CA'),
  };
};

// salva o indice de incendio no firebase
const _save = (indiceDindiceDate) => {
  return new Promise((resolve) => {
      database()
      .ref('/fires')
      .push(indiceDindiceDate)
      .then(() => {
        resolve(true);
      });
  });
};

// monta os objetos que representam um indice de incendio para ficar mais pratico para
// consultar as propriedades de cada dado
const mountData = (data) => {
  const indices = Object.values(data);
  const keys = Object.keys(data);

  return indices.map((value, index) => {
    return {
      ...value,
      uid: keys[index],
    };
  });
};

// envia a evidencia para o firebase
const sendEvidence = (pathSaveIndice, data, mediaType, uploadType) => {
  if (uploadType === UPLOAD_TYPE.IMAGE) {
    return new Promise((resolve) => {
      storage()
      .ref(pathSaveIndice)
      .putString(data, mediaType)
      .then((_) => {
        resolve(true);
      });
    });
  } else if (uploadType === UPLOAD_TYPE.VIDEO) {
    return new Promise((resolve, reject) => {
      storage()
      .ref(pathSaveIndice)
      .putFile(data, { contentType: `video/${mediaType}` })
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
};

function* indicesIncendios() {
  try {
    const dates = generateDate();
    const dateNow = new Date();
    dateNow.setDate(dateNow.getDate() - DAYS_TO_CALCULATE_INDICES);
    const dateFormated = dateNow.toLocaleDateString('en-CA');

    const { data } = yield call(
      axios.get,
      `${DB_URI_PROD}/${COLECTION_NAME}.${MEDIA_TYPE}?orderBy="acq_date"&startAt="${dateFormated}"`,
    );

    const valuesMounted = yield mountData(data);

    let valuesIndices = [];
    for (let i = 0; i < valuesMounted.length; i++) {
      if (
        moment(valuesMounted[i].acq_date).isBetween(dates.startAt) && valuesMounted[i]?.active
      ) {
        valuesIndices.push(valuesMounted[i]);
      }
    }

    if (valuesIndices) {
      yield put(fetchIndicesIncendiosSuccess(valuesIndices));
    }
  } catch (error) {
    yield put(fetchIndicesIncendiosFail(error));
  }
}

function* saveIndice(action) {
  try {
    const indiceCreateToUser = action.payload;
    const result = yield _save(indiceCreateToUser);

    if (result) {
      yield put(fetchSaveIndiceSuccess(result));
    }
  } catch (error) {
    yield put(fetchSaveIndiceFail(error));
  }
}

const mounteEvidenceName = (name) => {
  return name.substring(name.lastIndexOf('/') + 1);
};

const urlEvidenceUploaded = async (evidenceName) => {
  return await storage().ref(evidenceName).getDownloadURL();
};

// atualiza a lista de evidencias de um indice
const updateListEvidences = (
  indiceUID,
  evidenceUrl,
  mediaType,
  registrationUser,
) => {
  return new Promise((resolve, reject) => {
       database()
      .ref('/fires/' + indiceUID)
      .child('evidences')
      .push({
        uri: evidenceUrl,
        created_at: moment().format('DD/MM/yyyy'),
        registration_for: registrationUser,
        media_type: mediaType,
      })
      .then(() => {
        resolve(true);
      })
      .catch((err) => reject(err));
  });
};

function* addEvidence(action) {
  try {
    const {
      evidence,
      mediaType,
      indiceId,
      evidenceFileName,
      uploadType,
      registrationUser,
    } = action.payload;
    
    const fileName = mounteEvidenceName(evidenceFileName);
    const pathToSaveEvidence = `evidences/${fileName}`;

    if (indiceId) {
      const evidenceSaved = yield sendEvidence(
        pathToSaveEvidence,
        evidence,
        mediaType,
        uploadType,
      );

      if (evidenceSaved) {
        const evidenceUrl = yield urlEvidenceUploaded(pathToSaveEvidence);
        if (evidenceUrl) {
          yield updateListEvidences(
            indiceId,
            evidenceUrl,
            mediaType,
            registrationUser,
          );

          yield put(fetchAddEvidenceSuccess(evidenceUrl));
        }
      } else {
        yield put(fetchAddEvidenceFail(new Error('Erro ao enviar evidência')));
      }
    }
  } catch (error) {
    yield put(fetchAddEvidenceFail(error));
  }
}

const removeAndUpdateEvidences = (evidences, evidenceToRemove, indiceUid) => {
  const evidencesFilters = evidences.filter(
    (evidence) => evidence.uid !== evidenceToRemove.uid,
  );

  return new Promise((resolve, reject) => {
      database()
      .ref('/fires/' + indiceUid)
      .child('evidences')
      .set(evidencesFilters)
      .then(() => {
        resolve(true);
      })
      .catch((err) => reject(err));
  });
};

function* removeEvidence(action) {
  try {
    const { evidence, allEvidences, indiceUid } = action.payload;

    if (evidence === null) {
      yield put(
        fetchRemoveEvidenceFail(new Error('Erro ao remover evidência.')),
      );
    }

    const userRegistration = yield AsyncStorage.getItem(USER_REGISTRATION);

    const userRegistrationParser = parseInt(JSON.parse(userRegistration), 10);

    const evidenceRegistrationForParser = parseInt(
      evidence.registration_for,
      10,
    );

    if (userRegistrationParser !== evidenceRegistrationForParser) {
      yield put(
        fetchRemoveEvidenceFail(new Error('Erro ao remover evidência.')),
      );
    } else {
      const evidenceRemoved = yield removeAndUpdateEvidences(
        allEvidences,
        evidence,
        indiceUid,
      );
      if (evidenceRemoved) {
        yield put(fetchRemoveEvidenceSuccess(evidenceRemoved));
      }
    }
  } catch (error) {
    yield put(fetchRemoveEvidenceFail(error));
  }
}

function* filterIndices(action) {
  try {
    const dateNow = new Date();
    const dates = generateDateFilter(action.payload);
    const dateFormated = `${dateNow.getFullYear()}-${dateNow.getMonth() < 10 ? '0' : ''}${dateNow.getMonth() + 1}-${
      action.payload === 2
        ? dateNow.getDate() - DAYS_TO_CALCULATE_INDICES
        : dateNow.getDate()
    }`;

    const { data } = yield call(
      axios.get,
      `${DB_URI_PROD}/${COLECTION_NAME}.${MEDIA_TYPE}?orderBy="acq_date"&startAt="${dateFormated}"`,
    );

    // monta os dados do filtro
    const valuesMounted = yield mountData(data);
    // faz uma iteração sobre todos os indices e verifica se o indice está dentro do filtro e se esta com status de ATIVO
    let valuesIndices = [];
    for (let i = 0; i < valuesMounted.length; i++) {
      if (
        (moment(valuesMounted[i].acq_date).isBetween(dates.startAt) &&
          valuesMounted[i]?.active) ||
        valuesMounted[i].active
      ) {
        valuesIndices.push(valuesMounted[i]);
      }
    }
    if (valuesIndices) {
      yield put(fetchFilterIndicesSuccess(valuesIndices));
    }
  } catch (error) {
    yield put(fetchFilterIndicesFail(error));
  }
}
export const indicesSagas = [
  takeLatest(FETCH_INDICES_INCENDIOS, indicesIncendios),
  takeLatest(FETCH_SAVE_INDICE, saveIndice),
  takeLatest(FETCH_ADD_EVIDENCE, addEvidence),
  takeLatest(FETCH_REMOVE_EVIDENCE, removeEvidence),
  takeLatest(FETCH_FILTER_INDICES_INCENDIOS, filterIndices),
];
