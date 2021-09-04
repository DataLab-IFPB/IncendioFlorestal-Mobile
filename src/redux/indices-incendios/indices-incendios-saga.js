import { put } from '@redux-saga/core/effects';
import firebase from 'firebase';
import { takeLatest } from 'redux-saga/effects';
import {
  fetchIndicesIncendiosFail,
  fetchIndicesIncendiosSuccess,
  fetchSaveIndiceFail,
  fetchSaveIndiceSuccess,
} from './indices-incendios-action';
import {
  FETCH_INDICES_INCENDIOS,
  FETCH_SAVE_INDICE,
} from './indices-incendios-types';

const _getData = () => {
  return new Promise((resolve) => {
    firebase
      .database()
      .ref()
      .child('dados-firms')
      .get()
      .then((values) => resolve(values.val()));
  });
};

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

function* indicesIncendios() {
  try {
    const data = yield _getData();

    yield put(fetchIndicesIncendiosSuccess(Object.values(data)));
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

export const indicesSagas = [
  takeLatest(FETCH_INDICES_INCENDIOS, indicesIncendios),
  takeLatest(FETCH_SAVE_INDICE, saveIndice),
];
