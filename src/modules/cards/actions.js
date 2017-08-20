import fetch from 'isomorphic-fetch';
import {REQUEST_CARDS, RECEIVE_CARDS} from "../types";

function requestCards() {
  return {
    type: REQUEST_CARDS
  }
}

function receiveCards(json) {
  return {
    type: RECEIVE_CARDS,
    value: json.cards
  }
}

export function fetchCards() {
  return function (dispatch) {
    dispatch(requestCards());
    return fetch('/api/cards')
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json => dispatch(receiveCards(json)));
  }
}
