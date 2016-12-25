import {
  ADD_RESOURCE_TYPE,
  UPDATE_RESOURCE_QUANTITY
} from '../actions.js';

const ACTION_HANDLERS = {
  [ADD_RESOURCE_TYPE]: (state, action) => {
    return [
      ...state,
      action.payload
    ];
  },
  [UPDATE_RESOURCE_QUANTITY]: (state, action) => {
    let resource = _.find(state, {type: action.resourceType})
    if (!resource) return state
    resource.quantity += action.quantity
    return _.cloneDeep(state)
  }
}

const initialState = [{
  name: 'Wood',
  type: 'WOOD',
  value: 1,
  quantity: 0
},{
  name: 'Berries',
  type: 'BERRIES',
  value: 1,
  quantity: 0
}, {
  name: 'Water',
  type: 'WATER',
  value: 1,
  quantity: 0
}, {
  name: 'Stone',
  type: 'STONE',
  value: 1,
  quantity: 0
}];

export default function resourceTypesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}