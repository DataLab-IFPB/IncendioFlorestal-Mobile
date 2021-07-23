import * as types from './indices-incendios-types';

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_INDICES_INCENDIOS:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_INDICES_INCENDIOS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case types.FETCH_INDICES_INCENDIOS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
