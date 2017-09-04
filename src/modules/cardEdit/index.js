import {
  CARD_EDIT_REQUESTED, CARD_EDIT_CLOSED, CARD_PROPERTY_UPDATED, BALANCE_UPDATE_REQUESTED, BALANCE_UPDATE_CLOSED,
  BALANCE_UPDATED
} from "../types";

const initialState = {
  isUpdatingBalance: false,
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
    case BALANCE_UPDATED:
      return {
        ...state,
        card: action.card
      };
    case BALANCE_UPDATE_REQUESTED:
      return {
        ...state,
        isUpdatingBalance: true,
        card: action.card
      };
    case BALANCE_UPDATE_CLOSED:
      return {
        ...state,
        isUpdatingBalance: false,
        card: null
      };
    default:
      return state;
  }
}
