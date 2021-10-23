import {
    FETCH_TRANSACTIONS_IDLE,
    FETCH_TRANSACTIONS_BEGIN,
    FETCH_TRANSACTIONS_SUCCESS,
    FETCH_TRANSACTIONS_FAIL,
  } from '../actions/types/index';
  const initialState = {
    data: [],
    isLoading: false, // Default to fetching..
    error: null,
  };
  export default (state = initialState, action) => {
      console.log('action.payload');
      console.log(action.payload);
    switch (action.type) {
      case FETCH_TRANSACTIONS_BEGIN:
        return {
          ...state,
          data: null,
          isLoading: true,
          error: null,
        };
      case FETCH_TRANSACTIONS_SUCCESS:
        return {
          ...state,
          data: action.payload,
          isLoading: false,
        };
      case FETCH_TRANSACTIONS_FAIL:
        return {
          ...state,
          data: [],
          error: action.payload.response.data.error,
          isLoading: false,
        };
  
      default:
        return state;
    }
  };
  