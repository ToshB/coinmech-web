import {RECEIVE_TRANSACTIONS, REQUEST_TRANSACTIONS} from "../types";

function requestTransactions() {
  return {
    type: REQUEST_TRANSACTIONS
  }
}

function receiveTransactions(json) {
  return {
    type: RECEIVE_TRANSACTIONS,
    value: json.transactions
  }
}

export function fetchTransactions() {
  return function (dispatch) {
    dispatch(requestTransactions());
    return fetch('/api/transactions')
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json => dispatch(receiveTransactions(json)));
  }
}