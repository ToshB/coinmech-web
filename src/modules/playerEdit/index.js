import {
  PLAYER_ADD_REQUESTED,
  PLAYER_EDIT_CLOSED,
  PLAYER_EDITED, PLAYER_EDIT_REQUESTED, PLAYER_DELETE_REQUESTED, PLAYER_DELETE_CLOSED, BALANCE_UPDATE_CLOSED,
  BALANCE_UPDATE_REQUESTED, BALANCE_UPDATED
} from "./actions"

const initialState = {
  isEditingPlayer: false,
  isDeletingPlayer: false,
  isUpdatingBalance: false,
  player: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PLAYER_ADD_REQUESTED:
      return {
        ...state,
        isEditingPlayer: true,
        player: {
          name: '',
          email: '',
          card: ''
        }
      };
    case PLAYER_EDIT_REQUESTED:
      return {
        ...state,
        isEditingPlayer: true,
        player: action.player
      };
    case PLAYER_EDIT_CLOSED:
      return {
        ...state,
        isEditingPlayer: false,
        player: null
      };
    case PLAYER_EDITED:
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
        isDeletingPlayer: true,
        player: action.player
      };
    case PLAYER_DELETE_CLOSED:
      return {
        ...state,
        isDeletingPlayer: false,
        player: null
      };
    case BALANCE_UPDATE_REQUESTED:
      return {
        ...state,
        isUpdatingBalance: true,
        player: action.player
      };
    case BALANCE_UPDATE_CLOSED:
      return {
        ...state,
        isUpdatingBalance: false,
        player: null
      };
    case BALANCE_UPDATED:
      return {
        ...state,
        player: action.player
      };
    default:
      return state;
  }
}
