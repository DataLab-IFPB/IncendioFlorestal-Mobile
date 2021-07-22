import { fetchPrevisaoSuccess, fetchPrevisaoFail } from './previsao-action';
import { FETCH_PREVISAO } from './previsao-types';
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* previsao(action) {
  const API_KEY = 'key=a9fcb364';
  const BASE_URL = `https://api.hgbrasil.com/weather?${API_KEY}`;
  try {
    const { latitude, longitude } = action.payload;

    if (latitude === null && longitude === null) {
      yield put(fetchPrevisaoFail(new Error('coordinates invalid')));
    }

    const { data } = yield call(
      axios.get,
      `${BASE_URL}&lat=${latitude}&long=${longitude}`,
    );

    if (data) {
      yield put(fetchPrevisaoSuccess(data));
    }
  } catch (error) {
    yield put(fetchPrevisaoFail(error));
  }
}

export function* previsaoSaga() {
  yield takeLatest(FETCH_PREVISAO, previsao);
}
