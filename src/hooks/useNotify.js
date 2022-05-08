import React, { useEffect, useState } from 'react';
import { Notify } from '../components/Layout';
import { useSelector } from 'react-redux';

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

  useEffect(() => {
    if (showNotify) {
      sleep(5000);
    }
  }, [showNotify]);

  const sleep = (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setShowNotify(false);
        resolve();
      }, time);
    });
  };

  return showNotify ? <Notify /> : null;
};

export default useNotify;
