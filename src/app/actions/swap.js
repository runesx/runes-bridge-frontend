import axios from 'axios';
import {
  START_SWAP_IDLE,
  START_SWAP_BEGIN,
  START_SWAP_SUCCESS,
  START_SWAP_FAIL,
  ENQUEUE_SNACKBAR,
} from './types/index';

export function idleStartSwapAction() {
  return function (dispatch) {
    dispatch({
      type: START_SWAP_IDLE,
      payload: {
        data: 0,
        isFetching: false,
        phase: 0,
        error: null,
      },
    });
  }
}

export function startSwapAction(body, type) {
  console.log(body);
  console.log('start swap action');
  return function (dispatch) {
    dispatch({
      type: START_SWAP_BEGIN,
    });
    axios.post(`${process.env.API_URL}/create`, { destinationAddress: body, type })
      .then((response) => {
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: Deposit Address Generated',
            key: new Date().getTime() + Math.random(),
            options: {
              variant: 'success',
            },
          },
        });
        dispatch({
          type: START_SWAP_SUCCESS,
          payload: response,
        });
      }).catch((error) => {
        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
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
          type: START_SWAP_FAIL,
          payload: error,
        });
      });
  }
}
