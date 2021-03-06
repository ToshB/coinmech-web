import {
  PLAYER_PROPERTY_UPDATED, PLAYER_EDIT_REQUESTED, PLAYER_DELETE_REQUESTED,
  PLAYER_DELETE_CLOSED, PLAYER_EDIT_CLOSED, PLAYER_ADD_REQUESTED
} from "../types";

const initialState = {
  player: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PLAYER_ADD_REQUESTED:
      return {
        ...state,
        player: {name: '', email: '', cardId: ''}
      };
    case PLAYER_EDIT_REQUESTED:
      return {
        ...state,
        player: action.player
      };
    case PLAYER_EDIT_CLOSED:
      return {
        ...state,
        player: null
      };
    case PLAYER_PROPERTY_UPDATED:
      return {
        ...state,
        player: {
          ...state.player,
          ...action.value
        }
      };
    case PLAYER_DELETE_REQUESTED:
      return {
        ...state,
        player: action.player
      };
    case PLAYER_DELETE_CLOSED:
      return {
        ...state,
        player: null
      };
    default:
      return state;
  }
}
