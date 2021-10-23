import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

export function startSwapAction(body, address, amount = 0, type) {
  return function (dispatch) {
    dispatch({
      type: START_SWAP_BEGIN,
      payload: {
        isLoading: true,
      },
    });
    axios.post(`${process.env.API_URL}/create`, {
      destinationAddress: body,
      type,
      amount,
      address,
    })
      .then((response) => {
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: Bridge open',
            key: new Date().getTime() + Math.random(),
            options: {
              variant: 'success',
            },
          },
        });
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
