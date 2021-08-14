import { all } from 'redux-saga/effects';
import { indicesSagas } from './indices-incendios/indices-incendios-saga';
import { loginSaga } from './login/login-saga';
import { previsaoSaga } from './previsao/previsao-saga';

export default function* rootSaga() {
  yield all([loginSaga(), ...indicesSagas, ...previsaoSaga]);
}
