import * as types from './indices-incendios-types';

const initialState = {
  data: null,
  error: null,
  loading: false,
  indiceSaved: false,
};

function _fetchStart(action, state) {
  return {
    ...state,
    loading: true,
  };
}
function _fetchFail(action, state) {
  return {
    ...state,
    loading: false,
    error: action.payload,
  };
}
export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_INDICES_INCENDIOS:
      return _fetchStart(action, state);
    case types.FETCH_INDICES_INCENDIOS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case types.FETCH_INDICES_INCENDIOS_FAIL:
      return _fetchFail(action, state);

    case types.FETCH_SAVE_INDICE:
      return _fetchStart(action, state);
    case types.FETCH_SAVE_INDICE_SUCCESS:
      return {
        ...state,
        loading: false,
        indiceSaved: action.payload,
      };
    case types.FETCH_SAVE_INDICE_FAIL:
      return _fetchFail(action, state);
    default:
      return state;
  }
}
