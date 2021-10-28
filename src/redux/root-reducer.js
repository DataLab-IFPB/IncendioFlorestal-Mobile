import { combineReducers } from 'redux';
import loginReducer from './login/login-reducer';
import indicesIncendiosReducer from './indices-incendios/indices-incendios-reducer';
import previsaoReducer from './previsao/previsao-reducer';
const rootReducer = combineReducers({
  login: loginReducer,
  indicesIncendios: indicesIncendiosReducer,
  previsao: previsaoReducer,
});

export default rootReducer;
