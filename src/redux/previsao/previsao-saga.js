import { fetchPrevisaoSuccess, fetchPrevisaoFail } from './previsao-action';
import { FETCH_PREVISAO } from './previsao-types';
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* previsao(action) {
  const API_KEY = 'key=a9fcb364';
  const BASE_URL = `https://api.hgbrasil.com/weather?${API_KEY}`;
  // const API_KEY = 'ae5317a5cb3651ff7ed2ba7b39d7c0bd';

  try {
    const { latitude, longitude } = action.payload;

    const { data } = yield call(
      axios.get,
      `${BASE_URL}&lat=${latitude}&lon=${longitude}&user_ip=remote`,
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
