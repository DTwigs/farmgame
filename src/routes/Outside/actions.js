// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_POSITION = 'outside/UPDATE_POSITION';
export const UPDATE_MAP_POSITION = 'outside/UPDATE_MAP_POSITION';
export const UPDATE_CAN_FISH = 'outside/UPDATE_CAN_FISH';
export const UPDATE_CAN_GATHER = 'outside/UPDATE_CAN_GATHER';

// ------------------------------------
// Actions
// ------------------------------------
export function updatePosition (position) {
  return {
    type: UPDATE_POSITION,
    payload: { position }
  };
}

export function updateMapPosition (position) {
  return {
    type: UPDATE_MAP_POSITION,
    payload: { position }
  };
}

export function updateCanFish (canFish = false) {
  return {
    type: UPDATE_CAN_FISH,
    payload: { canFish }
  };
}

export function updateCanGather (canGather = false) {
  return {
    type: UPDATE_CAN_GATHER,
    payload: { canGather }
  };
}
