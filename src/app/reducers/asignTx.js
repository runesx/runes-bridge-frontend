import {
    START_ASSIGN_TX_IDLE,
  START_ASSIGN_TX_BEGIN,
  START_ASSIGN_TX_SUCCESS,
  START_ASSIGN_TX_FAIL,
  } from '../actions/types/index';
  const initialState = {
    data: [],
    isLoading: false, // Default to fetching..
    error: null,
  };
  export default (state = initialState, action) => {
      console.log(action.payload);
    switch (action.type) {
      case START_ASSIGN_TX_BEGIN:
        return {
          ...state,
          data: null,
          isLoading: true,
          error: null,
        };
      case START_ASSIGN_TX_SUCCESS:
        return {
          ...state,
          data: action.payload,
          isLoading: false,
        };
      case START_ASSIGN_TX_FAIL:
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
  