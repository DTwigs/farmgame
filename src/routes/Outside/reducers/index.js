import positionReducer from './position-reducer.js';
import { combineReducers } from 'redux'

const outsideReducers = combineReducers({
  mapPosition: positionReducer,
});

export default outsideReducers;