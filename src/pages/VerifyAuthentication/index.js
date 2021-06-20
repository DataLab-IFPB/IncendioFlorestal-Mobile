import React, { useEffect, useState } from 'react';
import Login from '../Login';
import Maps from '../Maps';

const VerifyAuthentication = () => {
  const [validateToken, setValidateToken] = useState(false);
  useEffect(() => {}, []);

  return validateToken ? <Maps /> : <Login />;
};

export default VerifyAuthentication;
