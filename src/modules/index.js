import {foundReducer} from 'found';
import {combineReducers} from 'redux';
import players from './players';

export default combineReducers({
  found: foundReducer,
  players
});
