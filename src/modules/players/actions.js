import fetch from 'isomorphic-fetch';
import {PLAYER_ADD_REQUESTED, PLAYER_EDIT_CLOSED, RECEIVE_PLAYERS, REQUEST_PLAYERS} from "../types";

function requestPlayers() {
  return {
    type: REQUEST_PLAYERS
  }
}

function receivePlayers(json) {
  return {
    type: RECEIVE_PLAYERS,
    value: json.players
  }
}

export function closePlayerEdit() {
  return {
    type: PLAYER_EDIT_CLOSED
  }
}

export function startAddingPlayer() {
  return {
    type: PLAYER_ADD_REQUESTED
  }
}

export function fetchPlayers() {
  return function (dispatch) {
    dispatch(requestPlayers());
    return fetch('/api/players')
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json => dispatch(receivePlayers(json)));
  }
}
