import {
    ACTIVATE_WALLET_BEGIN,
    ACTIVATE_WALLET_SUCCESS,
    ACTIVATE_WALLET_FAIL,
  } from '../actions/types/index';
  const initialState = {
    data: null,
    isLoading: false, // Default to fetching..
    error: null,
  };
  export default (state = initialState, action) => {
      console.log(action.payload);
    switch (action.type) {
      case ACTIVATE_WALLET_BEGIN:
        return {
          ...state,
          data: null,
          isLoading: true,
          error: null,
        };
      case ACTIVATE_WALLET_SUCCESS:
        return {
          ...state,
          data: 'success',
          isLoading: false,
        };
      case ACTIVATE_WALLET_FAIL:
        return {
          ...state,
          data: [],
          error: 'fail',
          isLoading: false,
        };
  
      default:
        return state;
    }
  };
  