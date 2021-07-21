import { combineReducers } from 'redux';
import loginReducer from './login/login-reducer';
import indicesIncendiosReducer from './indices-incendios/indices-incendios-reducer';
const rootReducer = combineReducers({
  login: loginReducer,
  indicesIncendios: indicesIncendiosReducer,
});

export default rootReducer;
