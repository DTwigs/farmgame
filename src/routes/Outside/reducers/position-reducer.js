import {
  UPDATE_POSITION
} from '../actions.js'

const ACTION_HANDLERS = {
  [UPDATE_POSITION]: (state, action) => {
    console.log(action.payload.position)
    return action.payload.position;
  }
}

const initialState = []

export default function resourceTypesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
