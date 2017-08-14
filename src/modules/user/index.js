import {LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILED} from "../types";

const initialState = {
  loginEmail: '',
  isLoggingIn: false,
  isAuthenticated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        username: action.username
      };
    default:
      return state;
  }
}
