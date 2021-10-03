import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIndicesIncendios } from '../../redux/indices-incendios/indices-incendios-action';
import Loading from '../components/Loading';
import Login from '../Login';
import Maps from '../Maps';

const VerifyAuthentication = () => {
  const Stack = createStackNavigator();
  const [validateToken, setValidateToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const loadingIndices = useSelector((state) => state.indicesIncendios.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setValidateToken(true);
        setLoading(false);
      } else if (user === null) {
        setValidateToken(false);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (validateToken) {
      dispatch(fetchIndicesIncendios());
    }
  }, [dispatch, validateToken]);

  if (validateToken === null) {
    return (
      <Loading loading={loading || loadingIndices || validateToken === null} />
    );
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
