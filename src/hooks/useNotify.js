import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Notify from '../pages/components/Notify';
const useNotify = () => {
  const [showNotify, setShowNotify] = useState(false);
  const evidenceSaved = useSelector(
    (state) => state.indicesIncendios.loadingAddEvidence,
  );

  useEffect(() => {
    if (evidenceSaved) {
      setShowNotify(evidenceSaved);
    }
  }, [evidenceSaved]);

  const sleep = (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setShowNotify(false);
        resolve();
      }, time);
    });
  };

  useEffect(() => {
    if (showNotify) {
      sleep(5000);
    }
  }, [showNotify]);
  return showNotify ? <Notify /> : null;
};

export default useNotify;
