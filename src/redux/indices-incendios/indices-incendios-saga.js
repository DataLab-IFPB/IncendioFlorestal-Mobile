import { call, put } from '@redux-saga/core/effects';
import axios from 'axios';
import firebase from 'firebase';
import { takeLatest } from 'redux-saga/effects';
import { DB_URI } from '../../constants/keys';
import {
  fetchAddEvidenceFail,
  fetchAddEvidenceSuccess,
  fetchIndicesIncendiosFail,
  fetchIndicesIncendiosSuccess,
  fetchSaveIndiceFail,
  fetchSaveIndiceSuccess,
} from './indices-incendios-action';
import {
  FETCH_ADD_EVIDENCE,
  FETCH_INDICES_INCENDIOS,
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

const updateAndAddEvidence = (evidence, indiceId) => {
  return new Promise((resolve) => {
    const evidenceSaved = firebase
      .database()
      .ref('dados-firms/' + indiceId)
      .update({
        evidences: {
          evidence,
        },
      });
    resolve(evidenceSaved);
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

function* addEvidence(action) {
  try {
    const { evidence, indiceId } = action.payload;

    const evidenceSaved = yield updateAndAddEvidence(evidence, indiceId);

    if (evidenceSaved) {
      yield put(fetchAddEvidenceSuccess(evidenceSaved));
    }
  } catch (error) {
    yield put(fetchAddEvidenceFail(error));
  }
}

export const indicesSagas = [
  takeLatest(FETCH_INDICES_INCENDIOS, indicesIncendios),
  takeLatest(FETCH_SAVE_INDICE, saveIndice),
  takeLatest(FETCH_ADD_EVIDENCE, addEvidence),
];
