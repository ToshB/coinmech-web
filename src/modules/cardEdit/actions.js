import {
  CARD_EDIT_CLOSED,
  CARD_EDIT_REQUESTED, CARD_PROPERTY_UPDATED, CARD_ASSIGNED
} from "../types";
import {fetchCards} from "../cards/actions";
import {fetchPlayers} from "../players/actions";

export function startEditingCard({card}) {
  return {
    type: CARD_EDIT_REQUESTED,
    card
  }
}

export function closeCardEdit() {
  return {
    type: CARD_EDIT_CLOSED
  }
}

export function updateProperty(change) {
  return {
    value: change,
    type: CARD_PROPERTY_UPDATED
  }
}

export function saveCard({card_id, playerId}) {
  return dispatch => {
    return fetch(`/api/cards/${card_id}/assignToPlayer`, {
      method: 'POST',
      body: JSON.stringify({playerId}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(p => dispatch({type: CARD_ASSIGNED, value: p}))
      .then(() => dispatch(fetchCards()))
      .then(() => dispatch(fetchPlayers()))
      .then(() => dispatch(closeCardEdit()));
  };
}
