import {combineReducers} from 'redux';
import players from './players';
import playerEdit from './playerEdit';
import {routerReducer} from 'react-router-redux';


export default combineReducers({
  router: routerReducer,
  players,
  playerEdit
});
