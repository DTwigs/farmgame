import positionReducer from './position-reducer.js';
import { combineReducers } from 'redux'

const outsideReducers = combineReducers({
  position: positionReducer,
});

export default outsideReducers;