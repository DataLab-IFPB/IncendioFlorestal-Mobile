import { all } from 'redux-saga/effects';
import { loginSaga } from './login/login-saga';
import { indicesIncendiosSagas } from './indices-incendios/indices-incendios-saga';
export default function* rootSaga() {
  yield all([loginSaga(), indicesIncendiosSagas()]);
}
