// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_POSITION = 'outside/UPDATE_POSITION';
export const UPDATE_MAP_POSITION = 'outside/UPDATE_MAP_POSITION';

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
