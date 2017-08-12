import {RECEIVE_TRANSACTIONS} from "../types";

const initialState = {
  isLoaded: false,
  items: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_TRANSACTIONS:
      return {
        ...state,
        items: action.value
      };
    default:
      return state;
  }
}
