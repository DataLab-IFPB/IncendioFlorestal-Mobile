import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { put, takeLatest } from 'redux-saga/effects';
import { REQUEST_LOGIN, REQUEST_NEW_USER } from './login-types';
import {
  firstLogin,
  requestLoginFail,
  requestLoginSuccess,
  createNewUserSuccess,
  createNewUserFail,
} from './login-action';

const getUserInRealTime = (registration) => {
  return new Promise((resolve) => {
      database()
      .ref('/users')
      .orderByChild('registration')
      .equalTo(registration)
      .once('value')
      .then((value) => {
        resolve(value.val());
      });
  });
};

const mountUser = (data) => {

  const ref = Object.keys(data)[0];
  const userData = Object.values(data)[0];

  return {
    ...userData,
    ref,
  };
};
 
const updateUserUID = (uid, user) => {
  return new Promise((resolve) => {
    const userRef = database()
      .ref('/users/' + user.ref)
      .update({
        registration: user.registration,
        isAdmin: user.isAdmin,
        email: user.email,
        deletedAt: user.deletedAt,
        birthDate: user.birthDate,
        firstLogin: false,
        uid,
      });
    resolve(userRef);
  });
}

function* login(action) {
  try {
    const { registration, password } = action.payload;

    const userRef = yield getUserInRealTime(registration);
    const userData = mountUser(userRef);

    // Verificar se é o primeiro acesso
    if( userData.birthDate === password && userData.firstLogin ) {    
       yield put(firstLogin(userRef));
    } else {                                                          // Usuário já cadastrado

      const { user } = yield auth().signInWithEmailAndPassword(userData.email, password);

      if( user ) {
        // Persistir a sessão
        yield auth().setPersistence(auth().Auth.Persistence.LOCAL);
        yield put(requestLoginSuccess(user));
      }
   }
  } catch (error) {
    console.log(error);
    yield put(requestLoginFail(error));
  }
}

function* createNewUser(action) {
  try {
    const { password, userData } = action.payload;
    const userFormated = mountUser(userData);

    const { user } = yield auth().createUserWithEmailAndPassword(userFormated.email, password);
    
    const userUpdated = updateUserUID(user.uid, userFormated);

    if (user && userUpdated) {
      yield put(createNewUserSuccess(userFormated));
    } 
  } catch (error) {
    yield put(createNewUserFail(error));
  }
}

export const loginSaga = [
  takeLatest(REQUEST_LOGIN, login),
  takeLatest(REQUEST_NEW_USER, createNewUser)
];
