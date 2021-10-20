import axios from 'axios';
import {
  START_SWAP_IDLE,
  START_SWAP_BEGIN,
  START_SWAP_SUCCESS,
  START_SWAP_FAIL,
  ENQUEUE_SNACKBAR,
} from './types/index';
import history from '../history';

export function idleStartSwapAction() {
  return function (dispatch) {
    dispatch({
      type: START_SWAP_IDLE,
      payload: {
        data: null,
        isLoading: false,
        error: null,
      },
    });
  }
}

export function startSwapAction(body, type, amount = 0) {
  console.log(body);
  console.log('start swap action');
  return function (dispatch) {
    dispatch({
      type: START_SWAP_BEGIN,
      payload: {
        isLoading: true,
      },
    });
    axios.post(`${process.env.API_URL}/create`, { destinationAddress: body, type, amount })
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
        console.log('response');
        console.log(response.data.result.uuid);
        history.push(`operation/${response.data.result.uuid}`);
        dispatch({
          type: START_SWAP_SUCCESS,
          payload: response,
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
          type: START_SWAP_FAIL,
          payload: error,
        });
      });
  }
}
