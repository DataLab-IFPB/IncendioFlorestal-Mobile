import firebase from 'firebase';
import { put, takeLatest } from 'redux-saga/effects';
import { DOMAIN_EMAIL, USER_REGISTRATION } from '../../constants/keys';
import {
  fetchLoginFail,
  fetchLoginSuccess,
  fetchNewUserFail,
  fetchNewUserSuccess,
} from './login-action';
import { FETCH_LOGIN, FETCH_NEW_USER } from './login-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
const getUserInRealTime = (matricula) => {
  return new Promise((resolve) => {
    firebase
      .database()
      .ref()
      .child('users')
      .orderByChild('registration')
      .equalTo(matricula)
      .on('value', (value) => resolve(value.val()));
  });
};

const updateUserInRealTime = (user) => {
  return new Promise((resolve) => {
    const userRef = firebase
      .database()
      .ref('users/' + user.ref)
      .update({
        birthDate: '',
      });
    resolve(userRef);
  });
};

const mountEmailUser = (registration) => {
  return `${registration}${DOMAIN_EMAIL}`;
};

const mountUser = (data, userRef) => {
  return {
    registration: data.registration,
    birthDate: data.birthDate,
    email: data.email,
    ref: userRef,
  };
};

function updateUserUidAndEmail(user, ref) {
  return new Promise((resolve) => {
    const userRef = firebase
      .database()
      .ref('users/' + ref)
      .update({
        uid: user.uid,
        email: user.email,
        birthDate: '',
        registration: '',
      });
    resolve(userRef);
  });
}

function* login(action) {
  try {
    const { matricula, senha } = action.payload;

    const userRefInDb = yield getUserInRealTime(matricula);
    const formatUserData = Object.values(userRefInDb)[0];
    const senhaParse = senha.toString();
    yield AsyncStorage.setItem(USER_REGISTRATION, matricula);
    if (
      formatUserData.birthDate !== senhaParse &&
      formatUserData.birthDate !== ''
    ) {
      yield put(fetchLoginFail(new Error('Usuário não encontrado')));
    } else {
      const userRef = Object.keys(userRefInDb)[0];
      const userData = mountUser(formatUserData, userRef);
      if (formatUserData.birthDate !== '') {
        yield put(
          fetchLoginSuccess({
            userData,
            firstLogin: true,
          }),
        );
      }
      if (formatUserData.birthDate === '') {
        const { user } = yield firebase
          .auth()
          .signInWithEmailAndPassword(formatUserData.email, senhaParse);

        if (user) {
          yield put(fetchLoginSuccess(user));
        }
      } else if (senhaParse !== userData.birthDate) {
        yield put(fetchLoginFail('Senha inválida'));
      }
    }
  } catch (error) {
    yield put(fetchLoginFail(error));
  }
}

function* createNewUser(action) {
  try {
    const { senha, userData } = action.payload;

    const { user } = yield firebase
      .auth()
      .createUserWithEmailAndPassword(
        mountEmailUser(userData.registration),
        senha,
      );

    const userUpdated = updateUserUidAndEmail(user, userData.ref);

    if (user && userUpdated) {
      yield updateUserInRealTime(user);

      yield login({ matricula: userData.registration, senha });
      yield put(fetchNewUserSuccess(user));
    }
  } catch (error) {
    yield put(fetchNewUserFail(error));
  }
}

export const loginSaga = [
  takeLatest(FETCH_LOGIN, login),
  takeLatest(FETCH_NEW_USER, createNewUser),
];
