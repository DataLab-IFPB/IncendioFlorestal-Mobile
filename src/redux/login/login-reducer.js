import * as types from './login-types';

const initialState = {
  data: null,
  error: null,
  loading: false,
  isAuthenticated: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_LOGIN:
      return {
        ...state,
        loading: true,
      };
    case types.REQUEST_LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case types.REQUEST_LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case types.FISRT_LOGIN:
      return {
        ...state,
        data: action.payload,
        loading: false
      };

    case types.AUTO_LOGIN_VERIFY:
      return {
        ...state,
        loading: true
      };
    case types.AUTO_LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isAuthenticated: true,
        loading: false
      };
    case types.AUTO_LOGIN_FAIL:
      return {
        ...state,
        loading: false
      }

    case types.REQUEST_NEW_USER:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_NEW_USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case types.CREATE_NEW_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
