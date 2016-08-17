import gridReducer from './grid-reducer.js';
import { combineReducers } from 'redux'

const gatherReducers = combineReducers({
  grid: gridReducer
});

export default gatherReducers;
