import * as types from './session-types';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_VERIFY_SESSION:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_VERIFY_SESSION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case types.FETCH_VERIFY_SESSION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
