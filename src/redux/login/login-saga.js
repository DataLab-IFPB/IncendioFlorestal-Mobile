import firebase from 'firebase';

import { put, takeLatest } from 'redux-saga/effects';
import {
  fetchLoginFail,
  fetchLoginSuccess,
  fetchNewUserFail,
  fetchNewUserSuccess,
} from './login-action';
import { FETCH_LOGIN, FETCH_NEW_USER } from './login-types';

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

const updateUserInRealTime = (user, statusNovoUsuario) => {
  return new Promise((resolve) => {
    const userRef = firebase
      .database()
      .ref('users/' + user.ref)
      .update({
        novoUsuario: statusNovoUsuario,
      });
    resolve(userRef);
  });
};

const mountUser = (data, userRef) => {
  return {
    email: data.email,
    ref: userRef,
    isAdmin: data.isAdmin,
    isExcluido: data.isExcluido,
    matricula: data.matricula,
    nome: data.nome,
    novoUsuario: data.novoUsuario,
    uid: data.uid,
  };
};

function* login(action) {
  try {
    const { matricula, senha } = action.payload;
    const userRefInDb = yield getUserInRealTime(matricula);

    const valuesUser = Object.values(userRefInDb)[0];
    const userRef = Object.keys(userRefInDb)[0];
    const userData = mountUser(valuesUser, userRef);

    if (userData === null) {
      yield put(fetchLoginFail(new Error('Usuário não encontrado')));
    } else {
      if (!userData.isExcluido) {
        if (userData.novoUsuario) {
          // é um novo usuario, então retorna ele para a tela de login
          // para ele ser redirecionado para a tela de alterar senha
          yield put(fetchLoginSuccess(userData));
        } else {
          const { user } = yield firebase
            .auth()
            .signInWithEmailAndPassword(userData.email, senha);

          if (user) {
            yield put(fetchLoginSuccess(user));
          }
        }
      } else {
        yield put(fetchLoginFail(new Error('Usuário excluído')));
      }
    }
  } catch (error) {
    yield put(fetchLoginFail(error));
  }
}

function* createNewUser(action) {
  try {
    const { senha, user } = action.payload;

    yield updateUserInRealTime(user, false);

    const newUser = yield firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, senha);

    if (newUser) {
      yield put(fetchNewUserSuccess(newUser));
    }
  } catch (error) {
    yield put(fetchNewUserFail(error));
  }
}

export const loginSaga = [
  takeLatest(FETCH_LOGIN, login),
  takeLatest(FETCH_NEW_USER, createNewUser),
];
