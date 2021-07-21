import { call, put, takeLatest } from '@redux-saga/core/effects';
import {
  fetchIndicesIncendiosSuccess,
  fetchIndicesIncendiosFail,
} from './indices-incendios-action';
import firebase from 'firebase';

import { FETCH_INDICES_INCENDIOS } from './indices-incendios-types';

const _getData = () => {
  return new Promise((resolve) => {
    firebase
      .database()
      .ref()
      .child('dados-firms')
      .get()
      .then((values) => {
        resolve(values.val());
      });
  });
};

function* indicesIncendios() {
  try {
    const data = yield _getData();
    if (data) {
      yield put(fetchIndicesIncendiosSuccess(Object.values(data)));
    }
  } catch (error) {
    yield put(fetchIndicesIncendiosFail(error));
  }
}

export function* indicesIncendiosSagas() {
  yield takeLatest(FETCH_INDICES_INCENDIOS, indicesIncendios);
}
