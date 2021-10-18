import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import { call, put } from '@redux-saga/core/effects';
import axios from 'axios';
import firebase from 'firebase';
import moment from 'moment';
import { takeLatest } from 'redux-saga/effects';
import { DB_URI } from '../../config/keys';
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
          console.log('reject ', err);
          reject(err);
        });
    });
  }
};

function* indicesIncendios() {
  try {
    const { data } = yield call(
      axios.get,
      `${DB_URI}/${COLECTION_NAME}.${MEDIA_TYPE}`,
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

    console.log(indiceId);
    const evidenceSaved = yield sendEvidence(
      pathToSaveEvidence,
      evidence,
      mediaType,
      uploadType,
    );

    if (evidenceSaved) {
      const evidenceUrl = yield urlEvidenceUploaded(pathToSaveEvidence);
      console.log(evidenceUrl);
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
  } catch (error) {
    yield put(fetchAddEvidenceFail(error));
  }
}

const removeAndUpdateEvidences = (evidences, evidenceToRemove, indiceUid) => {
  const evidencesFilters = evidences.filter(
    (evidence) => evidence.uid !== evidenceToRemove.item.uid,
  );

  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref('dados-firms/' + indiceUid)
      .child('evidences')
      .set(evidencesFilters)
      .then((value) => {
        console.log('evidence remover ', value);
        resolve(true);
      })
      .catch((err) => reject(err));
  });
};

function* removeEvidence(action) {
  try {
    const { evidence, allEvidences, indiceUid } = action.payload;

    const userRegistration = yield AsyncStorage.getItem(USER_REGISTRATION);

    const userRegistrationParser = parseInt(JSON.parse(userRegistration), 10);

    const evidenceRegistrationForParser = parseInt(
      evidence.item.registration_for,
      10,
    );

    if (userRegistrationParser !== evidenceRegistrationForParser) {
      yield put(
        fetchRemoveEvidenceFail(
          new Error('Erro ao remover evidência. Usuário sem permissão!'),
        ),
      );
    } else {
      const evidenceRemoved = yield removeAndUpdateEvidences(
        allEvidences,
        evidence,
        indiceUid,
      );

      yield put(fetchRemoveEvidenceSuccess(evidenceRemoved));
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
