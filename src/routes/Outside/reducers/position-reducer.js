import {
  UPDATE_MAP_POSITION,
  UPDATE_PLAYER_DIRECTION
} from '../actions.js'

const ACTION_HANDLERS = {
  [UPDATE_MAP_POSITION]: (state, action) => {
    return {
      ...state,
      coordinates: action.payload.coordinates,
    }
  },
  [UPDATE_PLAYER_DIRECTION]: (state, action) => {
    return {
      ...state,
      direction: action.payload.direction,
    }
  },
}

const initialState = {
  coordinates: [],
  direction: "down",
}

export default function positionReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
