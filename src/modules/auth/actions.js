import {LOGIN_SUCCESS, LOGOUT_SUCCESS, AUTH_INITIALIZED} from "../types";

export function receiveLogin(user) {
  const idToken = user.getAuthResponse().id_token;
  return dispatch => {
    return fetch(`/api/auth/tokensignin`, {
      method: 'POST',
      body: JSON.stringify({idToken}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(card => dispatch({
        type: LOGIN_SUCCESS,
        user: {
          name: user.getBasicProfile().getName()
        }
      }));
  }

}

export function initializeGoogleAuth() {
  return dispatch => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENTID,
        cookiepolicy: 'single_host_origin'
      })
        .then(() => {
          dispatch({type: AUTH_INITIALIZED});
        });
    });
  }
}

export function logout() {
  return dispatch => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut()
      .then(() => dispatch({
        type: LOGOUT_SUCCESS
      }));
  }
}