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

export const fetchPrevisaoUsuarioLogado = (coordenadas) => {
  return {
    type: types.FETCH_PREVISAO_USUARIO_LOGADO,
    payload: coordenadas,
  };
};

export const fetchPrevisaoUsuarioLogadoSucceess = (data) => {
  return {
    type: types.FETCH_PREVISAO_USUARIO_LOGADO_SUCCEES,
    payload: data,
  };
};
export const fetchPrevisaoUsuarioLogadoFail = (error) => {
  return {
    type: types.FETCH_PREVISAO_USUARIO_LOGADO_FAIL,
    payload: error,
  };
};
