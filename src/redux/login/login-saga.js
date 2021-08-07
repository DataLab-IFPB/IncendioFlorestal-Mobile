import firebase from 'firebase';
import { put, takeLatest } from 'redux-saga/effects';
import { fetchLoginFail, fetchLoginSuccess } from './login-action';
import { FETCH_LOGIN } from './login-types';

function* login(action) {
  try {
    const { matricula, senha } = action.payload;

    const { user } = yield firebase
      .auth()
      .signInWithEmailAndPassword(matricula, senha);

    if (user) {
      yield put(fetchLoginSuccess(user));
    }
  } catch (error) {
    yield put(fetchLoginFail(error));
  }
}

export function* loginSaga() {
  yield takeLatest(FETCH_LOGIN, login);
}
