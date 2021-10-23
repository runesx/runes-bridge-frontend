import axios from 'axios';
import {
  FETCH_OPERATION_IDLE,
  FETCH_OPERATION_BEGIN,
  FETCH_OPERATION_SUCCESS,
  FETCH_OPERATION_FAIL,
  ENQUEUE_SNACKBAR,
  FETCH_TRANSACTIONS_SUCCESS,
} from './types/index';

export function fetchOperationIdle() {
  return function (dispatch) {
    dispatch({
      type: FETCH_OPERATION_IDLE,
      payload: {
        data: null,
        isLoading: false,
        error: null,
      },
    });
  }
}

export function fetchOperationAction(id) {
  console.log('start swap action');
  return function (dispatch) {
    dispatch({
      type: FETCH_OPERATION_BEGIN,
      payload: {
        isLoading: true,
      },
    });
    axios.get(`${process.env.API_URL}/info/${id}`)
      .then((response) => {
        console.log(response);
        dispatch({
          type: FETCH_OPERATION_SUCCESS,
          payload: response.data.bridge,
        });
        dispatch({
          type: FETCH_TRANSACTIONS_SUCCESS,
          payload: response.data.transactions,
        });
      }).catch((error) => {
        console.log('error response');
        console.log(error.response);
        console.log(error);
        console.log(error.response.data);
        console.log(error.response.data.error);
        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log('error response');
          console.log(error.response);
          console.log(error.message);
          if (error.response.status === 429) {
            dispatch({
              type: ENQUEUE_SNACKBAR,
              notification: {
                message: `${error.response.status}: ${error.response.data}`,
                key: new Date().getTime() + Math.random(),
                options: {
                  variant: 'error',
                },
              },
            });
          } else {
            dispatch({
              type: ENQUEUE_SNACKBAR,
              notification: {
                message: `${error.response.status}: ${error.response.data.error}`,
                key: new Date().getTime() + Math.random(),
                options: {
                  variant: 'error',
                },
              },
            });
          }
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
        dispatch({
          type: FETCH_OPERATION_FAIL,
          payload: error,
        });
      });
  }
}
