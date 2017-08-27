import fetch from 'isomorphic-fetch';
import {closeMachineEdit, fetchMachines} from "../machines/actions";
import {
  MACHINE_CREATED, MACHINE_DELETE_CLOSED,
  MACHINE_DELETE_REQUESTED, MACHINE_DELETED,
  MACHINE_EDIT_REQUESTED, MACHINE_PROPERTY_UPDATED, MACHINE_UPDATED
} from "../types";

export function startEditingMachine(machine) {
  return {
    type: MACHINE_EDIT_REQUESTED,
    machine
  }
}

export function startDeletingMachine(machine) {
  return {
    type: MACHINE_DELETE_REQUESTED,
    machine
  }
}

export function closeMachineDelete() {
  return {
    type: MACHINE_DELETE_CLOSED
  }
}

export function addMachine(machine) {
  return dispatch => {
    return fetch('/api/machines', {
      method: 'POST',
      body: JSON.stringify(machine),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(dispatch({type: MACHINE_CREATED}));
  }
}

export function updateMachine(machine) {
  return dispatch => {
    return fetch(`/api/machines/${machine._id}`, {
      method: 'PUT',
      body: JSON.stringify(machine),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(dispatch({type: MACHINE_UPDATED}));
  };
}

export function deleteMachine({_id}) {
  return dispatch => {
    return fetch(`/api/machines/${_id}`, {
      method: 'DELETE',
    })
      .then(dispatch({type: MACHINE_DELETED}))
      .then(() => dispatch(fetchMachines()))
      .then(() => dispatch(closeMachineDelete()));
  }
}

export function saveMachine(machine) {
  return dispatch => {
    return Promise.resolve(machine._id)
      .then(machineId => {
        if (machineId) {
          return updateMachine(machine);
        } else {
          return addMachine(machine);
        }
      })
      .then(action => dispatch(action))
      .then(() => dispatch(fetchMachines()))
      .then(() => dispatch(closeMachineEdit()));
  }
}

export function updateProperty(change) {
  return {
    value: change,
    type: MACHINE_PROPERTY_UPDATED
  }
}
