import {LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS} from "../types";

const token = localStorage.getItem('access_token');
const initialState = {
  username: '',
  isFetching: false,
  loginFailed: false,
  errorMessage: null,
  isAuthenticated: Boolean(token)
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        username: action.username
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        loginFailed: false,
        errorMessage: null,
        isAuthenticated: true
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        loginFailed: true,
        errorMessage: action.message
      };
    case LOGOUT_REQUEST: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false
      }
    }
    default:
      return state;
  }
}
