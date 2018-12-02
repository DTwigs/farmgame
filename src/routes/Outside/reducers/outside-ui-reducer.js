import {
  UPDATE_CAN_FISH,
  UPDATE_CAN_GATHER,
} from '../actions.js'

const ACTION_HANDLERS = {
  [UPDATE_CAN_FISH]: (state, action) => {
    return {
      ...state,
      canFish: action.payload.canFish,
    };
  },
  [UPDATE_CAN_GATHER]: (state, action) => {
    return {
      ...state,
      canGather: action.payload.canGather,
    };
  }
}

const initialState = {
  canFish: false,
  canGather: false,
}

export default function outsideUIReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
