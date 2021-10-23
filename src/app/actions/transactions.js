import axios from 'axios';
import {
  FETCH_TRANSACTIONS_IDLE,
  FETCH_TRANSACTIONS_BEGIN,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_FAIL,
  ENQUEUE_SNACKBAR,
} from './types/index';

export function fetchTransactionsData() {
  return function (dispatch) {
    return new Promise((resolve) => {
      dispatch({
        type: FETCH_TRANSACTIONS_BEGIN,
      });
      axios.get(`${process.env.API_URL}/transactions`)
        .then((response) => {
          console.log('response.data');
          console.log(response.data);

          dispatch({
            type: FETCH_TRANSACTIONS_SUCCESS,
            payload: response.data.result,
          });
          resolve();
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: FETCH_TRANSACTIONS_FAIL,
            payload: error,
          });
          if (error.response) {
          // client received an error response (5xx, 4xx)
            console.log(error.response);
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
          resolve();
        });
    });
  }
}

export function placeholderss(username) {
  return function (dispatch) {

  }
}
