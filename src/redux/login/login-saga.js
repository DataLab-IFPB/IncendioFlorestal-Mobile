import AsyncStorage from '@react-native-async-storage/async-storage';
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
const getUserInRealTime = (matricula) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref()
      .child('users')
      .orderByChild('registration')
      .equalTo(matricula)
      .on('value', (value) => {
        resolve(value.val());
      });
  });
};

const getUserInRealTimeFilter = (matricula) => {
  return new Promise((resolve) => {
    firebase
      .database()
      .ref()
      .child('users')
      .orderByChild('email')
      .equalTo(`${matricula}${DOMAIN_EMAIL}`)
      .on('value', (value) => {
        resolve(value.val());
      });
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
        firstLogin: false,
      });
    resolve(userRef);
  });
}

function* login(action) {
  try {
    const { matricula, senha } = action.payload;
    // busca o usuario pela matricula
    const userRef = yield getUserInRealTime(matricula);
    let userRefInDb = null;
    // verifica se a referencia para o usuario no banco existe
    // se nao exsitir, é feitou uma consulta no firebase buscando pelo email que ja existe
    if (userRef === null) {
      userRefInDb = yield getUserInRealTimeFilter(matricula);
    } else {
      userRefInDb = userRef;
    }
    const formatUserData = Object.values(userRefInDb)[0];
    const senhaParse = senha.toString();
    yield AsyncStorage.setItem(USER_REGISTRATION, matricula);
    // verifica se a senha informada no login é a data de nascimento do usuarios
    if (
      formatUserData.birthDate !== senhaParse &&
      formatUserData.birthDate !== ''
    ) {
      yield put(fetchLoginFail(new Error('Usuário não encontrado')));
    } else {
      const userRef = Object.keys(userRefInDb)[0];
      const userData = mountUser(formatUserData, userRef);
      // se tiver data de nascimento, então é o primeiro login do usuario
      // entao sera retornado um objeto que representa que é seu primeiro login
      // com isso ele sera redirecionado para a tela de redefinir senha
      if (formatUserData.birthDate !== '') {
        yield put(
          fetchLoginSuccess({
            userData,
            firstLogin: true,
          }),
        );
      }
      // verifica se a data de nascimento esta vazia, se sim, significa que o usuario já fez login
      // então ele não precisa fazer o login novamente e não fazer login e redefinir a senha
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
