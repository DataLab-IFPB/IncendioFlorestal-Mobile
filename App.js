import React from 'react';
import Navigation from './src/pages/Navigation';
import { Provider } from 'react-redux';
import store from './src/redux';

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
