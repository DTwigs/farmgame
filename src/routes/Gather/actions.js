import { getAllSolvedMatches } from '../../routes/Gather/modules/grid-helpers.js';
// ------------------------------------
// Constants
// ------------------------------------
export const ADD_TILE = 'resources/ADD_TILE'
export const SELECT_GRID_TILE = 'resources/SELECT_GRID_TILE';
export const UNSELECT_GRID_TILE = 'resources/UNSELECT_GRID_TILE';
export const SWAP_GRID_TILES = 'resources/SWAP_GRID_TILES';
export const REMOVE_GRID_TILES = 'resources/REMOVE_GRID_TILES';
export const SHIFT_TILES_DOWN = 'resources/SHIFT_GRID_TILES_DOWN';

export const ADD_RESOURCE_TYPE = 'resourcesTypes/ADD_RESOURCE_TYPE';

// ------------------------------------
// Actions
// ------------------------------------
export function addTile (tile, row, column) {
  return {
    type: ADD_TILE,
    payload: { tile, row, column }
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

export function shiftGridTilesDown (tiles) {
  return {
    type: SHIFT_TILES_DOWN,
    payload: {tiles}
  }
}

export function swapAndMatch (tile1, tile2) {
  return (dispatch, getState) => {
    dispatch(swapGridTiles(tile1, tile2));

    const tiles = getState().gather.grid;
    const solvedTiles = getAllSolvedMatches(tiles);

    if (solvedTiles.length >= 3) {
      // console.log('we did it ', _.map(solvedTiles, (t) => t.resource.type));
      setTimeout(() => {
        dispatch(removeGridTiles(solvedTiles));
        dispatch(shiftGridTilesDown(solvedTiles));
      }, 200);
    } else {
      // unswap tiles after animation
      setTimeout(() => {
        // this will actually switch the tiles back to their original positions
        dispatch(swapGridTiles(tile1, tile2));
      }, 200);
    }
  }
}

export function populateResourceTiles() {
  return (dispatch, getState) => {
    let gridWidth, gridHeight, resourceTypes, grid;

    const getStateValues = () => {
      let state = getState().gather;
      gridWidth = 5; //state.gridWidth;
      gridHeight = 5; //state.gridHeight;
      resourceTypes = state.resourceTypes;
      grid = state.grid;
    }

    getStateValues();

    _.times(gridWidth, (row) => {
      _.times(gridHeight, (column) => {
        let tile = {};
        let resourceCopy = _.clone(resourceTypes);

        do {
          Math.floor( Math.random() * resourceTypes.length);
          const randomIndex = Math.floor(Math.random() * resourceCopy.length);
          tile.resource = resourceCopy[randomIndex];
          _.remove(resourceCopy, (x) => x == resourceCopy[randomIndex]);
        }
        while ((column >= 2 &&
          grid[(column - 1) + (row * gridWidth)].resource == tile.resource &&
          grid[(column - 2) + (row * gridWidth)].resource == tile.resource)
        ||
          (row >= 2 &&
          grid[column + ((row - 1) * gridWidth)].resource == tile.resource &&
          grid[column + ((row - 2) * gridWidth)].resource == tile.resource)
        );
        dispatch(addTile(tile, row, column));
        getStateValues();
      });
    });
  }
}
