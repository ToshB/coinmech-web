import {LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE, USER_REQUEST, LOGOUT_SUCCESS} from "../types";
import {push} from 'react-router-redux';

export function initializeSession(token) {
  return dispatch => {
    dispatch({type: USER_REQUEST, token});
    return fetch(`/api/users/info`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('invalid token');
        }

        return res.json();
      })
      .then(data => {
        dispatch({type: LOGIN_SUCCESS, user: data.user, token: token});
        dispatch(push('/'));
      })
      .catch(() => {
        // delete window.sessionStorage.token;
      });
  }
}

export function login(email, password) {
  return dispatch => {
    dispatch({type: LOGIN_REQUEST, email, password: password.replace(/./g, '*')});
    return fetch(`/api/users/login`, {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => {
            throw new Error(data.error);
          })
        } else {
          return res.json();
        }
      })
      .then(data => {
        dispatch({type: LOGIN_SUCCESS, user: data.user, token: data.token});
        dispatch(push('/'));
      })
      .catch(err => {
        dispatch({type: LOGIN_FAILURE, message: err.message});
      })
  }
}

export function logout() {
  return dispatch => {
    dispatch({type: LOGOUT_SUCCESS});
    delete window.sessionStorage.token;
    dispatch(push('/'));
  }
}