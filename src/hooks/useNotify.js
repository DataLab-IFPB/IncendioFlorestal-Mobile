import React from 'react';
import { useSelector } from 'react-redux';
import Notify from '../pages/components/Notify';
const useNotify = () => {
  const evidenceSaved = useSelector(
    (state) => state.indicesIncendios.evidenceSaved,
  );

  return evidenceSaved ? <Notify /> : null;
};

export default useNotify;
