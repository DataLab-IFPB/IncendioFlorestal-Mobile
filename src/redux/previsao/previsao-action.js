import * as types from './previsao-types';

export const fetchPrevisao = (coordenadas) => {
  return {
    type: types.FETCH_PREVISAO,
    payload: coordenadas,
  };
};
export const fetchPrevisaoSuccess = (data) => {
  return {
    type: types.FETCH_PREVISAO_SUCCESS,
    payload: data,
  };
};
export const fetchPrevisaoFail = (error) => {
  return {
    type: types.FETCH_PREVISAO_FAIL,
    payload: error,
  };
};
