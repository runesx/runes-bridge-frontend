import axios from 'axios';
import {
  START_ASSIGN_TX_IDLE,
  START_ASSIGN_TX_BEGIN,
  START_ASSIGN_TX_SUCCESS,
  START_ASSIGN_TX_FAIL,
  ENQUEUE_SNACKBAR,
} from './types/index';
import history from '../history';

export function idlePostAssignTxAction() {
  return function (dispatch) {
    dispatch({
      type: START_ASSIGN_TX_IDLE,
      payload: {
        data: null,
        isLoading: false,
        error: null,
      },
    });
  }
}

export function postAssignTxAction(uuid, txid) {
  return function (dispatch) {
    dispatch({
      type: START_ASSIGN_TX_BEGIN,
      payload: {
        isLoading: true,
      },
    });
    console.log('start posting assign');
    axios.post(`${process.env.API_URL}/assign`, {
      uuid,
      txid,
    })
      .then((response) => {
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: Swap Complete',
            key: new Date().getTime() + Math.random(),
            options: {
              variant: 'success',
            },
          },
        });
        console.log('response');
        console.log(response);
        // history.push(`operation/${response.data.result.uuid}`);
        dispatch({
          type: START_ASSIGN_TX_SUCCESS,
          payload: response,
        });
        return true;
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
          type: START_ASSIGN_TX_FAIL,
          payload: error,
        });
      });
  }
}
