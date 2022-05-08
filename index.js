/**
 * @format
 */

import App from './App';
import { name as appName } from './app.json';
import { AppRegistry } from 'react-native';
import { LogBox } from 'react-native';

if (__DEV__) {
  import('./src/config/ReactotronConfig').then(() =>
    console.log('Reactotron configurado'),
  );
}

LogBox.ignoreLogs(['Setting a timer']);
AppRegistry.registerComponent(appName, () => App);
