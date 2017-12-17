import {LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST} from "../types";

const initialState = {
  user: null,
  errorMessage: null,
  isAuthenticating: false,
  isAuthenticated: false,
  token: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loginFailed: false,
        errorMessage: null,
        isAuthenticating: true
      };
    case LOGIN_SUCCESS:
      window.sessionStorage.token = action.token;
      return {
        ...state,
        loginFailed: false,
        errorMessage: null,
        isAuthenticated: true,
        isAuthenticating: false,
        user: action.user,
        token: action.token
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loginFailed: true,
        isAuthenticated: false,
        isAuthenticating: false,
        errorMessage: action.message
      };
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false
      }
    }
    default:
      return state;
  }
}
