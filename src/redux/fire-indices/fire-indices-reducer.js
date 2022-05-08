import * as types from './fire-indices-types';

const initialState = {
  data: null,
  error: null,
  loading: false,
  indiceSaved: false,
  loadingAddEvidence: false,
  evidenceSaved: null,
  errorSaveEvidence: null,
  loadingRemoveEvidence: false,
  evidenceRemoved: null,
  errorRemoveEvidence: null,
  loadingFilter: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SAVE_FIRE_INDICE_OFFLINE:
      return {
        ...state,
        data: action.payload
      }
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

    case types.FETCH_ADD_EVIDENCE:
      return {
        ...state,
        loadingAddEvidence: true,
      };
    case types.FETCH_ADD_EVIDENCE_SUCCESS:
      return {
        ...state,
        evidenceSaved: action.payload,
        loadingAddEvidence: false,
      };
    case types.FETCH_ADD_EVIDENCE_FAIL:
      return {
        ...state,
        loadingAddEvidence: false,
        errorSaveEvidence: action.payload,
      };

    case types.FETCH_REMOVE_EVIDENCE: {
      return {
        ...state,
        loadingRemoveEvidence: true,
      };
    }

    case types.FETCH_REMOVE_EVIDENCE_SUCCESS: {
      return {
        ...state,
        loadingRemoveEvidence: false,
        evidenceRemoved: action.payload,
      };
    }
    case types.FETCH_REMOVE_EVIDENCE_FAIL: {
      return {
        ...state,
        loadingRemoveEvidence: false,
        errorRemoveEvidence: action.payload,
      };
    }

    case types.FETCH_FILTER_INDICES_INCENDIOS: {
      return {
        ...state,
        loadingFilter: true,
      };
    }

    case types.FETCH_FILTER_INDICES_INCENDIOS_SUCCESS: {
      return {
        ...state,
        loadingFilter: false,
        data: action.payload,
      };
    }
    case types.FETCH_FILTER_INDICES_INCENDIOS_FAIL: {
      return {
        ...state,
        loadingFilter: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
}
