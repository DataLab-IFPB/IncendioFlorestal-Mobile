import firebase from 'firebase';
import { getDatabase, ref, query, orderByChild } from 'firebase/database';

import { put, takeLatest } from 'redux-saga/effects';
import { fetchLoginFail, fetchLoginSuccess } from './login-action';
import { FETCH_LOGIN } from './login-types';

const getUserInRealTime = (matricula) => {
  return new Promise((resolve) => {
    firebase
      .database()
      .ref()
      .child('users')
      .orderByChild('matricula')
      .equalTo(matricula)
      .on('value', (value) => resolve(value.val()));
  });
};
function* login(action) {
  try {
    const { matricula, senha } = action.payload;
    const userRefInDb = yield getUserInRealTime(matricula);

    const userData = Object.values(userRefInDb)[0];
    if (userData === null) {
      yield put(fetchLoginFail(new Error('Usuário não encontrado')));
    } else {
      if (!userData.isExcluido) {
        const { user } = yield firebase
          .auth()
          .signInWithEmailAndPassword(userData.email, senha);

        if (user) {
          yield put(fetchLoginSuccess(user));
        }
        yield put(fetchLoginSuccess(null));
      } else {
        yield put(fetchLoginFail(new Error('Usuário excluído')));
      }
    }
  } catch (error) {
    yield put(fetchLoginFail(error));
  }
}

export function* loginSaga() {
  yield takeLatest(FETCH_LOGIN, login);
}
