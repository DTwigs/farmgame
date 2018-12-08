import {
  ADD_RESOURCE_TYPE,
  UPDATE_RESOURCE_QUANTITY
} from '../actions.js';
import {
  DEDUCT_RECIPE_COST
} from '../../Camp/actions.js';

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
  },
  [DEDUCT_RECIPE_COST]: (state, action) => {
    const costs = action.payload.cost;

    for (let key in action.payload.cost) {
      let resourceType = _.find(state, {type: key}),
        newQuantity = resourceType ? resourceType.quantity - costs[key] : 0;
      resourceType.quantity = newQuantity >= 0 ? newQuantity : 0;
    }

    return _.cloneDeep(state);
  },
}

const initialState = [{
  name: 'Wood',
  type: 'WOOD',
  value: 1,
  quantity: 0
},{
  name: 'Rice',
  type: 'RICE',
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