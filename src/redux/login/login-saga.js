import { put, takeLatest } from 'redux-saga/effects';
import { fetchLoginSuccess, fetchLoginFail } from './login-action';
import { FETCH_LOGIN } from './login-types';
import firebase from 'firebase';

function* login(action) {
  try {
    const { matricula, senha } = action.payload;

    const { user } = yield firebase
      .auth()
      .signInWithEmailAndPassword(matricula, senha);

    yield put(fetchLoginSuccess(user));
  } catch (error) {
    yield put(fetchLoginFail(error));
  }
}

export function* loginSaga() {
  yield takeLatest(FETCH_LOGIN, login);
}
