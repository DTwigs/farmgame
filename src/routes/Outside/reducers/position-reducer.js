import {
  UPDATE_MAP_POSITION
} from '../actions.js'

const ACTION_HANDLERS = {
  [UPDATE_MAP_POSITION]: (state, action) => {
    return action.payload.position;
  }
}

const initialState = []

export default function resourceTypesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
