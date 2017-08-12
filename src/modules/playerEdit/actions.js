import fetch from 'isomorphic-fetch';
import {fetchPlayers} from "../players/actions";

export const PLAYER_ADD_REQUESTED = 'PLAYER_ADD_REQUESTED';
export const PLAYER_EDIT_REQUESTED = 'PLAYER_EDIT_REQUESTED';
export const PLAYER_DELETE_REQUESTED = 'PLAYER_DELETE_REQUESTED';
export const PLAYER_EDIT_CLOSED = 'PLAYER_EDIT_CLOSED';
export const PLAYER_DELETE_CLOSED = 'PLAYER_DELETE_CLOSED';
export const PLAYER_PROPERTY_UPDATED = 'PLAYER_PROPERTY_UPDATED';
export const PLAYER_CREATED = 'PLAYER_CREATED';
export const PLAYER_UPDATED = 'PLAYER_UPDATED';
export const BALANCE_UPDATED = 'BALANCE_UPDATED';
export const PLAYER_DELETED = 'PLAYER_DELETED';
export const BALANCE_UPDATE_CLOSED = 'BALANCE_UPDATE_CLOSED';
export const BALANCE_UPDATE_REQUESTED = 'BALANCE_UPDATE_REQUESTED';


export function startAddingPlayer() {
  return {
    type: PLAYER_ADD_REQUESTED
  }
}

export function startEditingPlayer(player) {
  return {
    type: PLAYER_EDIT_REQUESTED,
    player
  }
}

export function startDeletingPlayer(player) {
  return {
    type: PLAYER_DELETE_REQUESTED,
    player
  }
}

export function startUpdatingBalance(player) {
  return {
    type: BALANCE_UPDATE_REQUESTED,
    player
  }
}

export function closePlayerEdit() {
  return {
    type: PLAYER_EDIT_CLOSED
  }
}

export function closePlayerDelete() {
  return {
    type: PLAYER_DELETE_CLOSED
  }
}

export function closeBalanceUpdate() {
  return {
    type: BALANCE_UPDATE_CLOSED
  }
}

export function updateBalance(player, amount) {
  return dispatch => {
    return fetch(`/api/players/${player.id}/addFunds`, {
      method: 'POST',
      body: JSON.stringify({amount}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(updatedPlayer => dispatch({type: BALANCE_UPDATED, player: updatedPlayer}))
      .then(() => dispatch(fetchPlayers()));
  }
}

export function addPlayer(player) {
  return dispatch => {
    return fetch('/api/players', {
      method: 'POST',
      body: JSON.stringify(player),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(dispatch({type: PLAYER_CREATED}));
  }
}

export function updatePlayer(player) {
  return dispatch => {
    return fetch(`/api/players/${player.id}`, {
      method: 'PUT',
      body: JSON.stringify(player),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(dispatch({type: PLAYER_UPDATED}));
  };
}

export function deletePlayer({id}) {
  return dispatch => {
    return fetch(`/api/players/${id}`, {
      method: 'DELETE',
    })
      .then(dispatch({type: PLAYER_DELETED}))
      .then(() => dispatch(fetchPlayers()))
      .then(() => dispatch(closePlayerDelete()));
  }
}

export function savePlayer(player) {
  return dispatch => {
    return Promise.resolve(player.id)
      .then(playerId => {
        if (playerId) {
          return updatePlayer(player);
        } else {
          return addPlayer(player);
        }
      })
      .then(action => dispatch(action))
      .then(() => dispatch(fetchPlayers()))
      .then(() => dispatch(closePlayerEdit()));
  }
}

export function updateProperty(change) {
  return {
    value: change,
    type: PLAYER_PROPERTY_UPDATED
  }
}
