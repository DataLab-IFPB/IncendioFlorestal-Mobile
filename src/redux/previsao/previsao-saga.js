import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchPrevisaoFail, fetchPrevisaoSuccess } from './previsao-action';
import { FETCH_PREVISAO } from './previsao-types';

function* previsao(action) {
  // const API_KEY = 'key=a9fcb364';
  // const BASE_URL = `https://api.hgbrasil.com/weather?${API_KEY}`;
  const API_KEY = '2e76240f6f9c4c24903191956213107';

  try {
    const { latitude, longitude } = action.payload;
    const URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}&aqi=no`;

    const { data } = yield call(axios.get, URL);

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
