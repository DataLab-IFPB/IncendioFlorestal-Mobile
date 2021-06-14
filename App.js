import React, { useEffect } from 'react';
import Navigation from './src/pages/Navigation';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import store from './src/redux';

export default function App () {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

