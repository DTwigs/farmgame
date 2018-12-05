// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_POSITION = 'outside/UPDATE_POSITION';
export const UPDATE_MAP_POSITION = 'outside/UPDATE_MAP_POSITION';
export const UPDATE_PLAYER_DIRECTION = 'outside/UPDATE_PLAYER_DIRECTION';
export const UPDATE_CAN_FISH = 'outside/UPDATE_CAN_FISH';
export const UPDATE_CAN_GATHER = 'outside/UPDATE_CAN_GATHER';
export const UPDATE_CAN_CAMP = 'outside/UPDATE_CAN_CAMP';

// ------------------------------------
// Actions
// ------------------------------------
export function updatePosition (coordinates, direction) {
  return {
    type: UPDATE_POSITION,
    payload: {
      coordinates,
      direction
    }
  };
}

export function updateMapPosition (coordinates) {
  return {
    type: UPDATE_MAP_POSITION,
    payload: { coordinates }
  };
}

export function updatePlayerDirection (direction) {
  return {
    type: UPDATE_PLAYER_DIRECTION,
    payload: { direction }
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

export function updateCanCamp (canCamp = false) {
  return {
    type: UPDATE_CAN_CAMP,
    payload: { canCamp }
  };
}
