import {
  CARD_EDIT_CLOSED,
  CARD_EDIT_REQUESTED, CARD_PROPERTY_UPDATED, CARD_ASSIGNED,
  BALANCE_UPDATE_REQUESTED, BALANCE_UPDATE_CLOSED, BALANCE_UPDATED, UPDATING_BALANCE
} from "../types";
import {fetchCards} from "../cards/actions";
import {fetchPlayers} from "../players/actions";

export function startUpdatingBalance(cardId) {
  return dispatch => {
    return fetch(`/api/cards/${cardId}`)
      .then(res => res.json())
      .then(card => dispatch({
        type: BALANCE_UPDATE_REQUESTED,
        card
      }));
  };
}

export function closeBalanceUpdate() {
  return dispatch => {
    dispatch(fetchCards())
      .then(() => dispatch({type: BALANCE_UPDATE_CLOSED}))
  };
}

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

export function updateBalance(cardId, amount) {
  return dispatch => {
    dispatch({type: UPDATING_BALANCE, cardId, amount});
    return fetch(`/api/cards/${cardId}/addMoney`, {
      method: 'POST',
      body: JSON.stringify({amount}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(card => dispatch({type: BALANCE_UPDATED, card}));
  }
}

export function saveCard({cardId, playerId}) {
  return dispatch => {
    return fetch(`/api/cards/${cardId}/assignToPlayer`, {
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
