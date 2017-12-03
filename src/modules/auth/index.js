import {LOGIN_SUCCESS, LOGOUT_SUCCESS, AUTH_INITIALIZED} from "../types";

const initialState = {
  user: null,
  errorMessage: null,
  isInitialized: false,
  isAuthenticated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_INITIALIZED: {
      return {
        ...state,
        isInitialized: true
      }
    }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginFailed: false,
        errorMessage: null,
        isAuthenticated: true,
        user: action.user
      };
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false
      }
    }
    default:
      return state;
  }
}
