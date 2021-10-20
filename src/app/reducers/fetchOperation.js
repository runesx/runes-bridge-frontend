import {
    FETCH_OPERATION_IDLE,
    FETCH_OPERATION_BEGIN,
    FETCH_OPERATION_SUCCESS,
    FETCH_OPERATION_FAIL,
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
      case FETCH_OPERATION_BEGIN:
        return {
          ...state,
          data: null,
          isLoading: true,
          error: null,
        };
      case FETCH_OPERATION_SUCCESS:
        return {
          ...state,
          data: action.payload,
          isLoading: false,
        };
      case FETCH_OPERATION_FAIL:
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
  