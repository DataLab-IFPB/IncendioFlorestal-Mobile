import Reactotron from 'reactotron-react-native';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reactoTronConfig from '../config/ReactotronConfig';
import rootReducer from './root-reducer';
import rootSagas from './root-sagas';

const sagaMonitor = Reactotron.createSagaMonitor;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const middleware = applyMiddleware(sagaMiddleware);
const store = createStore(
  rootReducer,
  compose(middleware, reactoTronConfig.createEnhancer()),
);
sagaMiddleware.run(rootSagas);

export default store;
