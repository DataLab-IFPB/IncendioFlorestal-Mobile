import * as types from './login-types';

const initialState = {
  data: null,
  loading: false,
  error: null,
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
    default:
      return state;
  }
}
