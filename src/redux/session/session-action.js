import * as types from './session-types';

export const fetchVerifySession = () => {
  return {
    type: types.FETCH_VERIFY_SESSION,
  };
};

export const fetchVerifySessionSuccess = (user) => {
  return {
    type: types.FETCH_VERIFY_SESSION_SUCCESS,
    payload: user,
  };
};

export const fetchVerifySessionFail = (error) => {
  return {
    type: types.FETCH_VERIFY_SESSION_FAIL,
    payload: error,
  };
};
