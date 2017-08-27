import {
  CARD_EDIT_REQUESTED, CARD_EDIT_CLOSED, CARD_PROPERTY_UPDATED
} from "../types";

const initialState = {
  card: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CARD_EDIT_REQUESTED:
      return {
        ...state,
        card: action.card
      };
    case CARD_EDIT_CLOSED:
      return {
        ...state,
        card: null
      };
    case CARD_PROPERTY_UPDATED:
      return {
        ...state,
        card: {
          ...state.card,
          ...action.value
        }
      };
    default:
      return state;
  }
}
