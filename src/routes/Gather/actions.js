import { getAllSolvedMatches } from '../../routes/Gather/modules/grid-helpers.js';
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

export function swapAndMatch (tile1, tile2) {
  return (dispatch, getState) => {
    dispatch(swapGridTiles(tile1, tile2));

    const tiles = getState().gather.grid;
    const solvedTiles = getAllSolvedMatches(tiles);

    if (solvedTiles.length >= 3) {
      console.log('we did it ', _.map(solvedTiles, (t) => t.type));
      dispatch(removeGridTiles(solvedTiles));
    } else {
      // unswap tiles after animation
      setTimeout(() => {
        dispatch(swapGridTiles(tile2, tile1));
      }, 200);
    }
  }
}