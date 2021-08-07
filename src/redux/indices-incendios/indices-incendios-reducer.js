import * as types from './indices-incendios-types';

const initialState = {
  data: null,
  error: null,
  loading: false,
  indiceSaved: false,
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

    case types.FETCH_SAVE_INDICE:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_SAVE_INDICE_SUCCESS:
      return {
        ...state,
        loading: false,
        indiceSaved: action.payload,
      };
    case types.FETCH_SAVE_INDICE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
