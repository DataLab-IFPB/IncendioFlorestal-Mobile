import React, { useEffect } from 'react';
import store from './src/redux';
import Theme from './src/providers/theme';
import Routes from './src/routes/routes';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <Provider store={store}>
      <Theme>
       <Routes/>
      </Theme>
    </Provider>
  );
}
