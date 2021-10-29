import Reactotron from 'reactotron-react-native';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reactoTronConfig from '../config/ReactotronConfig';
import rootReducer from './root-reducer';
import rootSagas from './root-sagas';
import {
  offlineMiddleware,
  suspendSaga,
  consumeActionMiddleware,
} from 'redux-offline-queue';

const middlewares = [];

middlewares.push(offlineMiddleware());

const suspendSagaMiddleware = suspendSaga(createSagaMiddleware());

const sagaMonitor = Reactotron.createSagaMonitor;

middlewares.push(suspendSagaMiddleware);
middlewares.push(consumeActionMiddleware);
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

applyMiddleware(sagaMiddleware);
const store = createStore(
  rootReducer,
  compose(middlewares, reactoTronConfig.createEnhancer()),
);
sagaMiddleware.run(rootSagas);

export default store;
