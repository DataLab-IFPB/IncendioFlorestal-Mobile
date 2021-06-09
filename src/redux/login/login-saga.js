import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchLoginSuccess, fetchLoginFail } from './login-action';
import { FETCH_LOGIN } from './login-types';

function* login(action) {
  try {
    const { matricula, senha } = action.payload;

    const { data } = yield call(axios.post, '', {
      matricula,
      senha,
    });

    yield put(fetchLoginSuccess(data));
  } catch (error) {
    yield put(fetchLoginFail(error));
  }
}

export function* loginSaga() {
  yield takeLatest(FETCH_LOGIN, login);
}
