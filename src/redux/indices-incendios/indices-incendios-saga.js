import { put } from '@redux-saga/core/effects';
import firebase from 'firebase';
import { takeLatest } from 'redux-saga/effects';
import {
  fetchIndicesIncendiosFail,
  fetchIndicesIncendiosSuccess,
} from './indices-incendios-action';
import { FETCH_INDICES_INCENDIOS } from './indices-incendios-types';

const _getData = () => {
  return new Promise((resolve) => {
    firebase
      .database()
      .ref()
      .child('dados-firms')
      .get()
      .then((values) => {
        resolve(Object.values(values.val()));
      });
  });
};

function* indicesIncendios() {
  try {
    const data = yield _getData();
    yield put(fetchIndicesIncendiosSuccess(data));
  } catch (error) {
    yield put(fetchIndicesIncendiosFail(error));
  }
}

export function* indicesIncendiosSagas() {
  yield takeLatest(FETCH_INDICES_INCENDIOS, indicesIncendios);
}
