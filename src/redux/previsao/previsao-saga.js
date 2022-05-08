import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { API_PREVISAO_KEY } from '../../config/keys';
import {
  fetchPrevisaoFail,
  fetchPrevisaoSuccess,
  fetchPrevisaoUsuarioLogadoFail,
  fetchPrevisaoUsuarioLogadoSucceess,
} from './previsao-action';
import {
  FETCH_PREVISAO,
  FETCH_PREVISAO_USUARIO_LOGADO,
} from './previsao-types';

function* previsao(action) {
  try {
    const { latitude, longitude } = action.payload;
    const URL = `https://api.weatherapi.com/v1/current.json?key=${API_PREVISAO_KEY}&q=${latitude},${longitude}&aqi=no`;

    const { data } = yield call(axios.get, URL);

    if (data) {
      yield put(fetchPrevisaoSuccess(data));
    }
  } catch (error) {
    yield put(fetchPrevisaoFail(error));
  }
}

function* previsaoUsuarioLogado(action) {
  try {
    const { latitude, longitude } = action.payload;
    const URL = `https://api.weatherapi.com/v1/current.json?key=${API_PREVISAO_KEY}&q=${latitude},${longitude}&aqi=no`;

    const { data } = yield call(axios.get, URL);

    if (data) {
      yield put(fetchPrevisaoUsuarioLogadoSucceess(data));
    }
  } catch (error) {
    yield put(fetchPrevisaoUsuarioLogadoFail(error));
  }
}
export const previsaoSaga = [
  takeLatest(FETCH_PREVISAO, previsao),
  takeLatest(FETCH_PREVISAO_USUARIO_LOGADO, previsaoUsuarioLogado),
];
