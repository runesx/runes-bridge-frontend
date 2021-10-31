import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
//import auth from './auth';
import tfa from "./tfa";
import theme from './changeTheme';
import alert from "./alert";
import startSwap from "./startSwap";
import fetchOperation from "./fetchOperation";
import transactions from "./transactions";
import assignTx from "./assignTx";
import activateWallet from './activateWallet';

const rootReducer = combineReducers({
  form,
  //auth: auth,
  tfa: tfa,
  theme: theme,
  alert: alert,
  startSwap: startSwap,
  fetchOperation: fetchOperation,
  transactions: transactions,
  assignTx: assignTx,
  activateWallet: activateWallet,
  
});

export default rootReducer;
