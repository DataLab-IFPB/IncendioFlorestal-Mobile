import React, { useEffect, useState } from 'react';
import Login from '../Login';
import Maps from '../Maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN } from '../../constants/keys';
const VerifyAuthentication = () => {
  const [validateToken, setValidateToken] = useState(false);
  useEffect(() => {
    async function verifyIfExistsAccessToken() {
      const token = await AsyncStorage.getItem(TOKEN);

      if (token) {
        setValidateToken(true);
      } else {
        setValidateToken(false);
      }
    }
    verifyIfExistsAccessToken();
  }, []);

  return validateToken ? <Maps /> : <Login />;
};

export default VerifyAuthentication;
