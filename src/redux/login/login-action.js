import {
  FETCH_LOGIN,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAIL,
} from './login-types';

export const fetchLogin = (userData) => {
  return {
    type: FETCH_LOGIN,
    payload: userData,
  };
};

export const fetchLoginSuccess = (userData) => {
  return {
    type: FETCH_LOGIN_SUCCESS,
    payload: userData,
  };
};

export const fetchLoginFail = (error) => {
  return {
    type: FETCH_LOGIN_FAIL,
    payload: error,
  };
};
