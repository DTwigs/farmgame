import craftRecipesReducer from './craft-recipes-reducer.js';
import { combineReducers } from 'redux'

const campReducers = combineReducers({
  recipes: craftRecipesReducer
});

export default campReducers;
