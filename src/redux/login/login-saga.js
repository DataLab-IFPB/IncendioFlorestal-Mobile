import { put, takeLatest, call } from 'redux-saga/effects';
import { fetchLoginSuccess, fetchLoginFail } from './login-action';
import { FETCH_LOGIN } from './login-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN, EXPIRATION_TIME, REFRESH_TOKEN } from '../../constants/keys';

import firebase from 'firebase';

function* login(action) {
  try {
    const { matricula, senha } = action.payload;

    const {user} = yield firebase.auth().signInWithEmailAndPassword(matricula, senha)

    
    if (user) {
      const {accessToken, expirationTime, refreshToken} = user.toJSON().stsTokenManager
  
      AsyncStorage.setItem(TOKEN, JSON.stringify(accessToken));
      AsyncStorage.setItem(REFRESH_TOKEN, JSON.stringify(expirationTime));
      AsyncStorage.setItem(EXPIRATION_TIME, JSON.stringify(refreshToken));
      yield put(fetchLoginSuccess(user));
    }
  } catch (error) {
    console.log(error);
    yield put(fetchLoginFail(error));
  }
}

export function* loginSaga() {
  yield takeLatest(FETCH_LOGIN, login);
}
