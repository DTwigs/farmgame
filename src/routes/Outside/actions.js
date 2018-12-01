// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_POSITION = 'outside/UPDATE_POSITION';

// ------------------------------------
// Actions
// ------------------------------------
export function updatePosition (position) {
  return {
    type: UPDATE_POSITION,
    payload: { position }
  };
}
