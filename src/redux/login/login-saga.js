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
        firstLoginAt: dateNow.format('DD/MM/yyyy HH:MM:SS').toString(),
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
    firstLogin: data.firstLogin,
    ref: userRef,
    birthDate: data.birthDate,
  };
};

function* login(action) {
  try {
    const { matricula, senha } = action.payload;
    const userRefInDb = yield getUserInRealTime(matricula);
    const formatUserData = Object.values(userRefInDb)[0];

    if (formatUserData.birthDate !== senha) {
      yield put(fetchLoginFail(new Error('Usuário não encontrado')));
    } else {
      const valuesUser = Object.values(userRefInDb)[0];
      const userRef = Object.keys(userRefInDb)[0];
      const userData = mountUser(valuesUser, userRef);

      if (!userData.isDeleted && userData.firstLogin) {
        yield put(fetchLoginSuccess(userData));
      } else if (!userData.isDeleted && senha === userData.birthDate) {
        const { user } = yield firebase
          .auth()
          .signInWithEmailAndPassword(userData.email, toString(senha));

        if (user) {
          yield put(fetchLoginSuccess(user));
        }
      } else if (userData.isDeleted) {
        yield put(fetchLoginFail(new Error('Usuário excluido')));
      } else if (senha !== userData.birthDate) {
        yield put(fetchLoginFail('Senha inválida'));
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
