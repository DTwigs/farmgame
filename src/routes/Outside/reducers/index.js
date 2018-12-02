import positionReducer from './position-reducer.js';
import outsideUIReducer from './outside-ui-reducer.js';
import { combineReducers } from 'redux'

const outsideReducers = combineReducers({
  mapPosition: positionReducer,
  ui: outsideUIReducer,
});

export default outsideReducers;