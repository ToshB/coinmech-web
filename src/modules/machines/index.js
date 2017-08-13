import {
  MACHINE_ADD_REQUESTED, MACHINE_EDIT_REQUESTED, RECEIVE_MACHINES, MACHINE_EDIT_CLOSED,
  MACHINE_DELETE_REQUESTED, MACHINE_DELETE_CLOSED
} from "../types";

const initialState = {
  isLoaded: false,
  isEditingMachine: false,
  isDeletingMachine: false,
  items: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MACHINE_ADD_REQUESTED:
    case MACHINE_EDIT_REQUESTED:
      return {
        ...state,
        isEditingMachine: true
      };
    case MACHINE_EDIT_CLOSED:
      return {
        ...state,
        isEditingMachine: false
      };
    case RECEIVE_MACHINES:
      return {
        ...state,
        items: action.value
      };
    case MACHINE_DELETE_REQUESTED:
      return {
        ...state,
        isDeletingMachine: true
      };
    case MACHINE_DELETE_CLOSED:
      return {
        ...state,
        isDeletingMachine: false
      };
    default:
      return state;
  }
}
