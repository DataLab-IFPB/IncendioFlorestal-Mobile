import { all } from 'redux-saga/effects';
import { loginSaga } from './login/login-saga';
import { sessionSaga } from './session/session-saga';
export default function* rootSaga() {
  yield all([loginSaga(), sessionSaga()]);
}
