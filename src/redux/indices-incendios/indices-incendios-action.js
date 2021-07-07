import * as types from './indices-incendios-types';

export const fetchIndicesIncendios = () => {
  return {
    type: types.FETCH_INDICES_INCENDIOS,
  };
};

export const fetchIndicesIncendiosSuccess = (data) => {
  return {
    type: types.FETCH_INDICES_INCENDIOS_SUCCESS,
    payload: data,
  };
};

export const fetchIndicesIncendiosFail = (error) => {
  return {
    type: types.FETCH_INDICES_INCENDIOS_FAIL,
    payload: error,
  };
};
