export const START_ADDING_PLAYER = 'START_ADDING_PLAYER';
export const FINISH_ADDING_PLAYER = 'FINISH_ADDING_PLAYER';
export const PLAYER_CHANGED = 'PLAYER_CHANGED';

export function startAddingPlayer() {
  return {
    type: START_ADDING_PLAYER
  }
}

export function cancelAddingPlayer() {
  return {
    type: FINISH_ADDING_PLAYER
  }
}
export function changePlayer(change) {
  console.log(change);
  return {
    change,
    type: PLAYER_CHANGED
  }
}