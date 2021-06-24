import { combineReducers } from 'redux';
import loginReducer from './login/login-reducer';
import sessionReducer from './session/session-reducer';
const rootReducer = combineReducers({
  login: loginReducer,
  session: sessionReducer,
});

export default rootReducer;
