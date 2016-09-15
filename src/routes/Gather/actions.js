import { getAllSolvedMatches, getGatherStateValues, ANIMATION_TIME } from '../../routes/Gather/modules/grid-helpers.js';
// ------------------------------------
// Constants
// ------------------------------------
export const ADD_TILE = 'resources/ADD_TILE';
export const UPDATE_TILE = 'resource/UPDATE_TILE';
export const SELECT_GRID_TILE = 'resources/SELECT_GRID_TILE';
export const UNSELECT_GRID_TILE = 'resources/UNSELECT_GRID_TILE';
export const SWAP_GRID_TILES = 'resources/SWAP_GRID_TILES';
export const SWAP_AND_MATCH = 'resources/SWAP_AND_MATCH';
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

export function updateTile (tile, row, column, pooled, resource) {
  return {
    type: UPDATE_TILE,
    payload: { tile, row, column, pooled, resource }
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
  return {
    type: SWAP_AND_MATCH,
    tile1,
    tile2
  }
}

// function findMatches (subsequentTry = false) {
//   return (dispatch, getState) => {
//     let tiles = getState().gather.grid;
//     const solvedTiles = getAllSolvedMatches(tiles);

//     if (solvedTiles.length >= 3) {
//       setTimeout(() => {
//         dispatch(removeGridTiles(solvedTiles));
//         dispatch(fillEmptyGridSpaces(solvedTiles));
//         setTimeout(() => {
//           dispatch(shiftGridTilesDown(solvedTiles));
//           dispatch(findMatches(true));
//         }, ANIMATION_TIME);
//       }, ANIMATION_TIME);
//     } else if (!subsequentTry) {
//       return false;
//     }
//     return true;
//   }
// }

// function fillEmptyGridSpaces(solvedTiles) {
//   return (dispatch, getState) => {
//     let sv = getGatherStateValues(getState);
//     let columns = _.uniq(_.map(solvedTiles, (tile) => tile.column));
//     let pooled = _.filter(sv.grid, {pooled: true});

//     _.forEach(columns, (col) => {
//       let column = _.filter(sv.grid, {column: col});
//       let emptySpaces = sv.gridHeight - column.length;

//       // Grab a pooled tile and update its position to sit over the column
//       // it will drop down into.
//       _.times(emptySpaces, (x) => {
//         const randomIndex = Math.floor(Math.random() * sv.resourceTypes.length);
//          let resource = sv.resourceTypes[randomIndex];
//         let tile = pooled.pop();
//         let row = -1 - x;
//         dispatch(updateTile(tile, row, col, false, resource))
//       });
//     });
//   }
// }

// export function swapAndMatch (tile1, tile2) {
//   return (dispatch, getState) => {
//     dispatch(swapGridTiles(tile1, tile2));

//     let matchesFound = dispatch(findMatches());

//     if (!matchesFound) {
//       // unswap tiles after animation
//       setTimeout(() => {
//         // this will actually switch the tiles back to their original positions
//         dispatch(swapGridTiles(tile1, tile2));
//       }, ANIMATION_TIME);
//     }
//   }
// }

export function populateResourceTiles() {
  return (dispatch, getState) => {
    let sv; // stateValues

    sv = getGatherStateValues(getState);

    _.times(sv.gridWidth, (row) => {
      _.times(sv.gridHeight, (column) => {
        let tile = {};
        let resourceCopy = _.clone(sv.resourceTypes);

        do {
          const randomIndex = Math.floor(Math.random() * resourceCopy.length);
          tile.resource = resourceCopy[randomIndex];
          _.remove(resourceCopy, (x) => x == resourceCopy[randomIndex]);
        }
        while ((column >= 2 &&
          sv.grid[(column - 1) + (row * sv.gridWidth)].resource == tile.resource &&
          sv.grid[(column - 2) + (row * sv.gridWidth)].resource == tile.resource)
        ||
          (row >= 2 &&
          sv.grid[column + ((row - 1) * sv.gridWidth)].resource == tile.resource &&
          sv.grid[column + ((row - 2) * sv.gridWidth)].resource == tile.resource)
        );
        dispatch(addTile(tile, row, column));
        sv = getGatherStateValues(getState);
      });
    });
    _.times(sv.gridWidth * sv.gridHeight, () => {
      let tile = {
        pooled: true,
        resource: sv.resourceTypes[0]
      }
      dispatch(addTile(tile, -1, -1));
    })
  }
}
