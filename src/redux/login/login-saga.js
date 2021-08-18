import firebase from 'firebase';
import moment from 'moment';
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
      .orderByChild('registration')
      .equalTo(parseInt(matricula))
      .on('value', (value) => resolve(value.val()));
  });
};

const updateUserInRealTime = (user) => {
  const dateNow = moment(new Date());
  return new Promise((resolve) => {
    const userRef = firebase
      .database()
      .ref('users/' + user.ref)
      .update({
        firstLoginAt: dateNow.format('dd/MM/yyyy HH:MM:SS'),
        firstLogin: false,
      });
    resolve(userRef);
  });
};

const mountUser = (data, userRef) => {
  return {
    name: data.name,
    email: data.email,
    registration: data.registration,
    isDeleted: data.isDeleted,
    isAdmin: data.isAdmin,
    firstLoginAt: data.firstLoginAt,
    ref: userRef,
    birthDate: data.birthDate,
  };
};

function* login(action) {
  try {
    const { matricula, senha } = action.payload;
    const userRefInDb = yield getUserInRealTime(matricula);

    if (!userRefInDb) {
      yield put(fetchLoginFail(new Error('Usuário não encontrado')));
    } else {
      const valuesUser = Object.values(userRefInDb)[0];
      const userRef = Object.keys(userRefInDb)[0];
      const userData = mountUser(valuesUser, userRef);

      if (!userData.isDeleted) {
        if (userData.firstLogin) {
          // é um novo usuario, então retorna ele para a tela de login
          // para ele ser redirecionado para a tela de alterar senha
          yield put(fetchLoginSuccess(userData));
        } else {
          if (toString(senha) === toString(userData.birthDate)) {
            const { user } = yield firebase
              .auth()
              .signInWithEmailAndPassword(userData.email, senha);

            if (user) {
              yield put(fetchLoginSuccess(user));
            }
          } else {
            yield put(fetchLoginFail(new Error('Senha inválida')));
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

    yield updateUserInRealTime(user);

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
