import { all } from 'redux-saga/effects';
import { loginSaga } from './login/login-saga';
import { indicesIncendiosSagas } from './indices-incendios/indices-incendios-saga';
import { previsaoSaga } from './previsao/previsao-saga';
export default function* rootSaga() {
  yield all([loginSaga(), indicesIncendiosSagas(), previsaoSaga()]);
}
