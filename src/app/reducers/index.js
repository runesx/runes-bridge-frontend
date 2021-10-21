import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
//import auth from './auth';
import tfa from "./tfa";
import theme from './changeTheme';
import alert from "./alert";
import startSwap from "./startSwap";
import fetchOperation from "./fetchOperation";

const rootReducer = combineReducers({
  form,
  //auth: auth,
  tfa: tfa,
  theme: theme,
  alert: alert,
  startSwap: startSwap,
  fetchOperation: fetchOperation
  
});

export default rootReducer;
