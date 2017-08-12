import {combineReducers} from 'redux';
import players from './players';
import transactions from './transactions';
import playerEdit from './playerEdit';
import {routerReducer} from 'react-router-redux';


export default combineReducers({
  router: routerReducer,
  transactions,
  players,
  playerEdit
});
