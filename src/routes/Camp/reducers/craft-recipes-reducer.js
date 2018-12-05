import {
  CRAFT_RECIPE,
  UNLOCK_RECIPE,
} from '../actions.js'

const ACTION_HANDLERS = {
  [UNLOCK_RECIPE]: (state, action) => {
    let item = _.find(state, {name: action.payload.itemName});
    if (item) {
      item.canCraft = true;
    }

    return _.cloneDeep(state);
  },
}

const initialState = [
  {
    name: "FISHING_POLE",
    display: "Fishing Pole",
    cost: {
      WOOD: 3,
      STONE: 3,
    },
    canCraft: true,
  },
  {
    name: "SAKE_BREWER",
    display: "Sake Brewer",
    cost: {
      WOOD: 20,
      STONE: 20,
      STEEL: 5,
    },
    canCraft: false,
  }
]

export default function outsideUIReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
