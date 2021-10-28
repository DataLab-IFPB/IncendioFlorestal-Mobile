import * as types from './login-types';

const initialState = {
  data: null,
  loading: false,
  error: null,
  newUser: null,
  loadingNewUser: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_LOGIN:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case types.FETCH_LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case types.FETCH_NEW_USER:
      return {
        ...state,
        loadingNewUser: true,
      };
    case types.FETCH_NEW_USER_SUCCESS:
      return {
        ...state,
        loadingNewUser: false,
        newUser: action.payload,
      };
    case types.FETCH_NEW_USER_FAIL:
      return {
        ...state,
        loadingNewUser: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
