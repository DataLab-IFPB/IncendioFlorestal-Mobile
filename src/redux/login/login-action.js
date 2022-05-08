import * as types from './login-types';

export const requestLogin = (userData) => {
  return {
    type: types.REQUEST_LOGIN,
    payload: userData,
  };
};

export const firstLogin = (userData) => {
  return {
    type: types.FISRT_LOGIN,
    payload: userData
  }
}

export const autoLoginVerify = () => {
  return {
    type: types.AUTO_LOGIN_VERIFY
  }
}

export const autoLoginSuccess = (userData) => {
  return {
    type: types.AUTO_LOGIN_SUCCESS,
    payload: userData
  };
}

export const autoLoginFail = () => {
  return {
    type: types.AUTO_LOGIN_FAIL
  }
}

export const requestLoginSuccess = (userData) => {
  return {
    type: types.REQUEST_LOGIN_SUCCESS,
    payload: userData,
  };
}

export const requestLoginFail = (error) => {
  return {
    type: types.REQUEST_LOGIN_FAIL,
    payload: error,
  };
}

export const requestNewUser = (data) => {
  return {
    type: types.REQUEST_NEW_USER,
    payload: data,
  };
}

export const createNewUserSuccess = (newUser) => {
  return {
    type: types.CREATE_NEW_USER_SUCCESS,
    payload: newUser,
  };
}

export const createNewUserFail = (error) => {
  return {
    type: types.CREATE_NEW_USER_FAIL,
    payload: error,
  };
}

