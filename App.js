import React, { useEffect } from 'react';
import Navigation from './src/pages/Navigation';
import { Provider } from 'react-redux';
import initFirebase from './src/core/firebase/firebase.config';
import SplashScreen from 'react-native-splash-screen';
import store from './src/redux';

export default function App() {
  initFirebase();
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
