import {
  REQUEST_PLAYERS,
  RECEIVE_PLAYERS,
} from "./actions"

const initialState = {
  isLoaded: false,
  isFetching: false,
  items: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PLAYERS:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_PLAYERS:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        items: action.value
      };
    default:
      return state;
  }
}
