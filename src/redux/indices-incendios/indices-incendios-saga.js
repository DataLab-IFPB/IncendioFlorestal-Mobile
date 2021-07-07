import { call, put, takeLatest } from '@redux-saga/core/effects';
import {
  fetchIndicesIncendiosSuccess,
  fetchIndicesIncendiosFail,
} from './indices-incendios-action';
import { FETCH_INDICES_INCENDIOS } from './indices-incendios-types';
import axios from 'axios';

const URL = '';

function* indicesIncendios() {
  try {
    const data = yield call(axios.get(''));

    yield put(fetchIndicesIncendiosSuccess(data));
  } catch (error) {
    yield put(fetchIndicesIncendiosFail(error));
  }
}

export function* indicesIncendiosSagas() {
  yield takeLatest(FETCH_INDICES_INCENDIOS, indicesIncendios);
}
