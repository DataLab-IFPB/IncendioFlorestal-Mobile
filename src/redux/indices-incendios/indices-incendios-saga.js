import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import { call, put } from '@redux-saga/core/effects';
import axios from 'axios';
import firebase from 'firebase';
import moment from 'moment';
import { takeLatest } from 'redux-saga/effects';
import { DB_URI_PROD } from '../../config/keys';
import { UPLOAD_TYPE, USER_REGISTRATION } from '../../constants/keys';
import {
  fetchAddEvidenceFail,
  fetchAddEvidenceSuccess,
  fetchIndicesIncendiosFail,
  fetchIndicesIncendiosSuccess,
  fetchRemoveEvidenceFail,
  fetchRemoveEvidenceSuccess,
  fetchSaveIndiceFail,
  fetchSaveIndiceSuccess,
} from './indices-incendios-action';
import {
  FETCH_ADD_EVIDENCE,
  FETCH_INDICES_INCENDIOS,
  FETCH_REMOVE_EVIDENCE,
  FETCH_SAVE_INDICE,
} from './indices-incendios-types';

const COLECTION_NAME = 'dados-firms';
const MEDIA_TYPE = 'json';
const LIMIT_TO_FIRST = 50;

// salva o indice de incendio no firebase
const _save = (indiceDindiceDate) => {
  return new Promise((resolve) => {
    firebase
      .database()
      .ref()
      .child('dados-firms')
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
        .then((value) => {
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
    const { data } = yield call(
      axios.get,
      `${DB_URI_PROD}/${COLECTION_NAME}.${MEDIA_TYPE}?orderBy="active"&equalTo=true&limitToFirst=${LIMIT_TO_FIRST}`,
    );

    const valuesMounted = yield mountData(data);

    if (valuesMounted) {
      yield put(fetchIndicesIncendiosSuccess(valuesMounted));
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
    firebase
      .database()
      .ref('dados-firms/' + indiceUID)
      .child('evidences')
      .push({
        uri: evidenceUrl,
        created_at: moment().format('DD/MM/yyyy'),
        registration_for: registrationUser,
        media_type: mediaType,
      })
      .then((value) => {
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
    firebase
      .database()
      .ref('dados-firms/' + indiceUid)
      .child('evidences')
      .set(evidencesFilters)
      .then((value) => {
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

export const indicesSagas = [
  takeLatest(FETCH_INDICES_INCENDIOS, indicesIncendios),
  takeLatest(FETCH_SAVE_INDICE, saveIndice),
  takeLatest(FETCH_ADD_EVIDENCE, addEvidence),
  takeLatest(FETCH_REMOVE_EVIDENCE, removeEvidence),
];
