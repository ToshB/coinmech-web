import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED} from "../types";

export function login(username, password) {
  return dispatch => {
    dispatch({type: LOGIN_REQUEST});
    return fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Login failed');
        }
        return res;
      })
      .then(() => dispatch({type: LOGIN_SUCCESS}))
      .catch(e => dispatch({type: LOGIN_FAILED, username, error: e.message}));
  };
}