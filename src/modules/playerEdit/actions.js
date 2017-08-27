import fetch from 'isomorphic-fetch';
import {closePlayerEdit, fetchPlayers} from "../players/actions";
import {
  BALANCE_UPDATE_CLOSED, BALANCE_UPDATE_REQUESTED, BALANCE_UPDATED, PLAYER_CREATED, PLAYER_DELETE_CLOSED,
  PLAYER_DELETE_REQUESTED, PLAYER_DELETED,
  PLAYER_EDIT_REQUESTED, PLAYER_PROPERTY_UPDATED, PLAYER_UPDATED
} from "../types";
import {fetchCards} from "../cards/actions";

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
    return fetch(`/api/players/${player._id}/addFunds`, {
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
    return fetch(`/api/players/${player._id}`, {
      method: 'PUT',
      body: JSON.stringify(player),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(dispatch({type: PLAYER_UPDATED, value: player}));
  };
}

export function deletePlayer({_id}) {
  return dispatch => {
    return fetch(`/api/players/${_id}`, {
      method: 'DELETE',
    })
      .then(dispatch({type: PLAYER_DELETED}))
      .then(() => dispatch(fetchPlayers()))
      .then(() => dispatch(closePlayerDelete()));
  }
}

export function savePlayer(player) {
  return dispatch => {
    return Promise.resolve(player._id)
      .then(playerId => {
        if (playerId) {
          return updatePlayer(player);
        } else {
          return addPlayer(player);
        }
      })
      .then(action => dispatch(action))
      .then(() => dispatch(fetchPlayers()))
      .then(() => dispatch(fetchCards()))
      .then(() => dispatch(closePlayerEdit()));
  }
}

export function updateProperty(change) {
  return {
    value: change,
    type: PLAYER_PROPERTY_UPDATED
  }
}
