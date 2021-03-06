import {CARD_EDIT_REQUESTED, CARD_EDIT_CLOSED, RECEIVE_CARDS} from "../types";

const initialState = {
  isLoaded: false,
  isEditingCard: false,
  items: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CARD_EDIT_REQUESTED:
      return {
        ...state,
        isEditingCard: true,
      };
    case CARD_EDIT_CLOSED:
      return {
        ...state,
        isEditingCard: false
      };

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
