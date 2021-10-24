import {
    START_SWAP_IDLE,
    START_SWAP_BEGIN,
    START_SWAP_SUCCESS,
    START_SWAP_FAIL,
  } from '../actions/types/index';
  const initialState = {
    data: null,
    isLoading: false, // Default to fetching..
    error: null,
  };
  export default (state = initialState, action) => {
      console.log(action.payload);
    switch (action.type) {
      case START_SWAP_IDLE:
        return {
          data: null,
          isLoading: false,
          error: null,
        };
      case START_SWAP_BEGIN:
        return {
          ...state,
          data: null,
          isLoading: true,
          error: null,
        };
      case START_SWAP_SUCCESS:
        return {
          ...state,
          data: action.payload,
          isLoading: false,
        };
      case START_SWAP_FAIL:
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
  