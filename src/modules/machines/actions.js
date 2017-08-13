import {MACHINE_ADD_REQUESTED, MACHINE_EDIT_CLOSED, RECEIVE_MACHINES, REQUEST_MACHINES} from "../types";

function requestMachines() {
  return {
    type: REQUEST_MACHINES
  }
}

function receiveMachines(json) {
  return {
    type: RECEIVE_MACHINES,
    value: json.machines
  }
}

export function closeMachineEdit() {
  return {
    type: MACHINE_EDIT_CLOSED
  }
}

export function startAddingMachine() {
  return {
    type: MACHINE_ADD_REQUESTED
  }
}

export function fetchMachines() {
  return function (dispatch) {
    dispatch(requestMachines());
    return fetch('/api/machines')
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json => dispatch(receiveMachines(json)));
  }
}