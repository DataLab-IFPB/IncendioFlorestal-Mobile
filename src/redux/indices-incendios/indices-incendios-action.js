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

export const fetchSaveIndice = (data) => {
  return {
    type: types.FETCH_SAVE_INDICE,
    payload: data,
  };
};

export const fetchSaveIndiceSuccess = (data) => {
  return {
    type: types.FETCH_SAVE_INDICE_SUCCESS,
    payload: data,
  };
};

export const fetchSaveIndiceFail = (error) => {
  return {
    type: types.FETCH_SAVE_INDICE_FAIL,
    payload: error,
  };
};

export const fetchAddEvidence = (evidence) => {
  return {
    type: types.FETCH_ADD_EVIDENCE,
    payload: evidence,
  };
};

export const fetchAddEvidenceSuccess = (data) => {
  return {
    type: types.FETCH_ADD_EVIDENCE_SUCCESS,
    payload: data,
  };
};

export const fetchAddEvidenceFail = (error) => {
  return {
    type: types.FETCH_ADD_EVIDENCE_FAIL,
    payload: error,
  };
};

export const fetchRemoveEvidence = (evidence) => {
  return {
    type: types.FETCH_REMOVE_EVIDENCE,
    payload: evidence,
  };
};

export const fetchRemoveEvidenceSuccess = (data) => {
  return {
    type: types.FETCH_REMOVE_EVIDENCE_SUCCESS,
    payload: data,
  };
};

export const fetchRemoveEvidenceFail = (error) => {
  return {
    type: types.FETCH_REMOVE_EVIDENCE_FAIL,
    payload: error,
  };
};
