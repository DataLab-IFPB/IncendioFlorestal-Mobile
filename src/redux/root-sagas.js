import { all } from 'redux-saga/effects';
import { loginSaga } from './login/login-saga';
import { previsaoSaga } from './previsao/previsao-saga';
import { indicesSagas } from './fire-indices/fire-indices-saga';

export default function* rootSaga() {
  yield all([...loginSaga, ...indicesSagas, ...previsaoSaga]);
}
