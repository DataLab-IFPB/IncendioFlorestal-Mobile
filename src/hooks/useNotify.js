import React from 'react';
import { useSelector } from 'react-redux';
import Notify from '../pages/components/Notify';
const useNotify = () => {
  const loadingSendEvidence = useSelector(
    (state) => state.indicesIncendios.loadingAddEvidence,
  );

  return !loadingSendEvidence ? <Notify /> : null;
};

export default useNotify;
