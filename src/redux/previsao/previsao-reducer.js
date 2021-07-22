import * as types from './previsao-types';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PREVISAO:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_PREVISAO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case types.FETCH_PREVISAO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
