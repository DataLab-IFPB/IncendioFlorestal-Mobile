import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Loading from '../components/Loading';
import Login from '../Login';
import Maps from '../Maps';

const VerifyAuthentication = () => {
  const Stack = createStackNavigator();
  const [validateToken, setValidateToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setValidateToken(true);
        setLoading(false);
      } else {
        setValidateToken(false);
        setLoading(false);
      }
    });
  }, []);

  if (validateToken === null) {
    return <Loading loading={loading} />;
  }
  return validateToken ? (
    <Stack.Navigator>
      <Stack.Screen
        name={'Maps'}
        component={Maps}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name={'Login'}
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default VerifyAuthentication;
