import { ADD_RESOURCE_TYPE } from '../actions.js';

const ACTION_HANDLERS = {
  [ADD_RESOURCE_TYPE]: (state, action) => {
    return [
      ...state,
      action.payload
    ];
  }
}

const initialState = [{
  name: 'Wood',
  type: 'WOOD',
  quantity: 1
},{
  name: 'Berries',
  type: 'BERRIES',
  quantity: 1
}, {
  name: 'Water',
  type: 'WATER',
  quantity: 1
}, {
  name: 'Stone',
  type: 'STONE',
  quantity: 1
}];

export default function resourceTypesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}