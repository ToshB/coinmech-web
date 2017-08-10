import {
  START_ADDING_PLAYER,
  FINISH_ADDING_PLAYER,
  PLAYER_CHANGED
} from "./actions"

const initialState = {
  isAddingPlayer: false,
  player: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_ADDING_PLAYER:
      return {
        ...state,
        isAddingPlayer: true,
        player: {
          name: '',
          email: '',
          cardId: ''
        }
      };
    case FINISH_ADDING_PLAYER:
      return {
        ...state,
        isAddingPlayer: false,
        player: null
      };
    case PLAYER_CHANGED:
      return {
        ...state,
        player: {
          ...state.player,
          ...action.change
        }
      };
    default:
      return state;
  }
}
