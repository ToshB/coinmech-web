import {RECEIVE_CARDS} from "../types";

const initialState = {
  isLoaded: false,
  items: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CARDS:
      return {
        ...state,
        isLoaded: true,
        items: action.value
      };
    default:
      return state;
  }
}
