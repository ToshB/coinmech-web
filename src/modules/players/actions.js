import fetch from 'isomorphic-fetch';

export const REQUEST_PLAYERS = 'REQUEST_PLAYERS';
export const RECEIVE_PLAYERS = 'RECEIVE_PLAYERS';

export function requestPlayers() {
  return {
    type: REQUEST_PLAYERS
  }
}

export function receivePlayers(json) {
  return {
    type: RECEIVE_PLAYERS,
    value: json.players
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
