import gridReducer from './grid-reducer.js';
import resourceTypesReducer from './resource-types-reducer.js';
import { combineReducers } from 'redux'

const gatherReducers = combineReducers({
  resourceTypes: resourceTypesReducer,
  grid: gridReducer
});

export default gatherReducers;
