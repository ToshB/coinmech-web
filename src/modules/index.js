import {combineReducers} from 'redux';
import players from './players';
import cards from './cards';
import playerEdit from './playerEdit';
import machines from './machines';
import machineEdit from './machineEdit';
import transactions from './transactions';
import user from './user';
import {routerReducer} from 'react-router-redux';


export default combineReducers({
  router: routerReducer,
  transactions,
  machines,
  machineEdit,
  players,
  cards,
  playerEdit,
  user
});
