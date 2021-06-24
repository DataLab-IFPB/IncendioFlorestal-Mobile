import { put, takeLatest, call } from 'redux-saga/effects';
import {
  fetchVerifySessionSuccess,
  fetchVerifySessionFail,
} from './session-action';
import { FETCH_VERIFY_SESSION } from './session-types';

import firebase from 'firebase';

function* verifySessionUser() {
  try {
    const promiseVerifySession = () => {
      return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            resolve(user);
          } else {
            reject();
          }
        });
      });
    };

    const user = yield call(promiseVerifySession);

    yield put(fetchVerifySessionSuccess(user));
  } catch (error) {
    yield put(fetchVerifySessionFail(error));
  }
}
export function* sessionSaga() {
  yield takeLatest(FETCH_VERIFY_SESSION, verifySessionUser);
}
