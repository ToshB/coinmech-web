import {foundReducer} from 'found';
import {combineReducers} from 'redux';
import players from './players';
import playerEdit from './playerEdit';

export default combineReducers({
  found: foundReducer,
  players,
  playerEdit
});
