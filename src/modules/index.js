import {combineReducers} from 'redux';
import players from './players';
import cards from './cards';
import playerEdit from './playerEdit';
import machines from './machines';
import machineEdit from './machineEdit';
import transactions from './transactions';
import auth from './auth';
import cardEdit from './cardEdit';
import {routerReducer} from 'react-router-redux';


export default combineReducers({
  router: routerReducer,
  transactions,
  machines,
  machineEdit,
  players,
  cards,
  playerEdit,
  auth,
  cardEdit
});
