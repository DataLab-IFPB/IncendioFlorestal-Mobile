import firebase from 'firebase';
import { getDatabase, ref, query, orderByChild } from 'firebase/database';

import { put, takeLatest } from 'redux-saga/effects';
import { fetchLoginFail, fetchLoginSuccess } from './login-action';
import { FETCH_LOGIN } from './login-types';

function* login(action) {
  try {
    const { matricula, senha } = action.payload;

    const users = yield firebase
      .database()
      .ref()
      .child('users')
      .orderByKey()
      .get();

    const userInDb =
      Object.values(users.val()).filter(
        (user) => user.matricula == matricula,
      )[0] || null;

    if (userInDb === null) {
      yield put(fetchLoginFail(new Error('User not found')));
    }
    const { user } = yield firebase
      .auth()
      .signInWithEmailAndPassword(userInDb.email, senha);

    if (user) {
      yield put(fetchLoginSuccess(user));
    }
    yield put(fetchLoginSuccess(null));
  } catch (error) {
    yield put(fetchLoginFail(error));
  }
}

export function* loginSaga() {
  yield takeLatest(FETCH_LOGIN, login);
}
