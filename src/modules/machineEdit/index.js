import {
  MACHINE_PROPERTY_UPDATED, MACHINE_EDIT_REQUESTED, MACHINE_DELETE_REQUESTED, MACHINE_DELETE_CLOSED,
  MACHINE_EDIT_CLOSED, MACHINE_ADD_REQUESTED, DEVICE_STATUS_UPDATED
} from "../types";

const initialState = {
  machine: null,
  devices: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MACHINE_ADD_REQUESTED:
      return {
        ...state,
        machine: {name: '', price: 10, deviceId: ''}
      };
    case MACHINE_EDIT_REQUESTED:
      return {
        ...state,
        machine: action.machine
      };
    case MACHINE_EDIT_CLOSED:
      return {
        ...state,
        machine: null
      };
    case MACHINE_PROPERTY_UPDATED:
      return {
        ...state,
        machine: {
          ...state.machine,
          ...action.value
        }
      };
    case MACHINE_DELETE_REQUESTED:
      return {
        ...state,
        machine: action.machine
      };
    case MACHINE_DELETE_CLOSED:
      return {
        ...state,
        machine: null
      };
    case DEVICE_STATUS_UPDATED:
      return {
        ...state,
        devices: {
          ...state.devices,
          [action.deviceId]: action.value
        }
      };
    default:
      return state;
  }
}
