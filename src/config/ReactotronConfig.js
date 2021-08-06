import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

const reactoTronConfig = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({ host: '10.0.2.2' }) // android
  .useReactNative()
  .use(reactotronRedux())
  .use(reactotronSaga())
  .connect();

reactoTronConfig.clear();

console.tron = reactoTronConfig;

export default reactoTronConfig;
