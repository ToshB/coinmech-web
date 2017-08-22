import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS} from "../types";
import { push, goBack } from 'react-router-redux'

function requestLogout() {
  return {
    type: LOGOUT_REQUEST
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS
  };
}

function requestLogin({username, password}) {
  return {
    type: LOGIN_REQUEST,
    username,
    password
  };
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  };
}

export function logout() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('access_token');
    dispatch(receiveLogout());
    dispatch(goBack());
  }
}

export function login(username, password) {
  return dispatch => {
    dispatch(requestLogin({username, password}));
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
        return res.json();
      })
      .then(user => {
        localStorage.setItem('access_token', user.token);
        dispatch(receiveLogin(user));
        dispatch(push('/players'));
      })
      .catch(e => dispatch({type: LOGIN_FAILED, username, message: e.message}));
  };
}