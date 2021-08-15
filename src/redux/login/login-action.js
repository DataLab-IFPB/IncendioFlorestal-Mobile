import * as types from './login-types';

export const fetchLogin = (userData) => {
  return {
    type: types.FETCH_LOGIN,
    payload: userData,
  };
};

export const fetchLoginSuccess = (userData) => {
  return {
    type: types.FETCH_LOGIN_SUCCESS,
    payload: userData,
  };
};

export const fetchLoginFail = (error) => {
  return {
    type: types.FETCH_LOGIN_FAIL,
    payload: error,
  };
};

export const fetchNewUser = (data) => {
  return {
    type: types.FETCH_NEW_USER,
    payload: data,
  };
};
export const fetchNewUserSuccess = (newUser) => {
  return {
    type: types.FETCH_NEW_USER_SUCCESS,
    payload: newUser,
  };
};

export const fetchNewUserFail = (error) => {
  return {
    type: types.FETCH_NEW_USER_FAIL,
    payload: error,
  };
};
