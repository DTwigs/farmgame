// ------------------------------------
// Constants
// ------------------------------------
export const POPULATE_GRID = 'RESOURCES_POPULATE_GRID';
export const SELECT_GRID_TILE = 'RESOURCES_SELECT_GRID_TILE';
export const UNSELECT_GRID_TILE = 'RESOURCES_UNSELECT_GRID_TILE';
export const SWAP_GRID_TILES = 'RESOURCES_SWAP_GRID_TILES';
export const REMOVE_GRID_TILES = 'RESOURCES_REMOVE_GRID_TILES';

// ------------------------------------
// Actions
// ------------------------------------


export function populateGrid () {
  return {
    type: POPULATE_GRID
  }
}

export function selectGridTile (tile) {
  return {
    type: SELECT_GRID_TILE,
    payload: tile
  }
}

export function unselectGridTile (tile) {
  return {
    type: UNSELECT_GRID_TILE,
    payload: tile
  }
}

export function swapGridTiles (tile1, tile2) {
  return {
    type: SWAP_GRID_TILES,
    payload: { tile1, tile2 }
  }
}

export function removeGridTiles (tiles) {
  return {
    type: REMOVE_GRID_TILES,
    payload: { tiles }
  }
}