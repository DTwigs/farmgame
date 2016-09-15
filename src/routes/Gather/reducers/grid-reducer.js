import {
  ADD_TILE,
  UPDATE_TILE,
  SELECT_GRID_TILE,
  UNSELECT_GRID_TILE,
  SWAP_GRID_TILES,
  REMOVE_GRID_TILES,
  SHIFT_TILES_DOWN
} from '../actions.js';

import {
  buildResourceArray,
  updateTilePosition,
  findTileIndex,
  poolTile,
  TILE_SIZE,
  GRID_SIZE
} from '../modules/grid-helpers.js';
// ------------------------------------
// Action Handlers
// ------------------------------------



const TILE_ACTION_HANDLERS = {
  [ADD_TILE]: (state, action) => {
    return {
      ...action.payload.tile,
      row: action.payload.row,
      column: action.payload.column,
      id: `${action.payload.row}-${action.payload.column}`,
      x: action.payload.column * TILE_SIZE,
      y: action.payload.row * TILE_SIZE
    }
  },
 [SHIFT_TILES_DOWN]: (state, action) => {
    let tile = action.payload.tile;
    return {
      ...tile,
      row: tile.row + 1,
      column: tile.column,
      id: `${tile.row + 1}-${tile.column}`,
      x: tile.column * TILE_SIZE,
      y: (tile.row + 1) * TILE_SIZE
    }
  }
}

const GRID_ACTION_HANDLERS = {
  [ADD_TILE]: (state, action) => {
    return [
      ...state,
      tileReducer(state, action)
    ];
  },

  [UPDATE_TILE]: (state, action) => {
    state = _.map(state, (tile) => {
      if (tile === action.payload.tile) {
        tile.row = action.payload.row;
        tile.column = action.payload.column;
        tile.pooled = action.payload.pooled;
        tile.resource = action.payload.resource;
        tile.id = `${action.payload.row}-${action.payload.column}`;
        tile.x = action.payload.column * TILE_SIZE;
        tile.y = action.payload.row * TILE_SIZE;
        tile = _.clone(tile);
      }
      return tile;
    })
    return state;
  },

  [SELECT_GRID_TILE]: (state, action) => {
    const tile = action.payload;
    const stateTile = _.find(state, {id: tile.id});
    if (stateTile) {
      stateTile.selected = true;
      state = _.cloneDeep(state);
    }
    return state;
  },

  [UNSELECT_GRID_TILE]: (state, action) => {
    const tile = action.payload;
    const stateTile = _.find(state, {id: tile.id});
    if (stateTile) {
      stateTile.selected = false;
      state = _.cloneDeep(state);
    }
    return state;
  },

  [SWAP_GRID_TILES]: (state, action) => {
    const tile1 = action.payload.tile1;
    const tile2 = action.payload.tile2;

    const stateTile1 = _.find(state, {id: tile1.id});
    const stateTile2 = _.find(state, {id: tile2.id});

    if (!stateTile1 || !stateTile2) {
      return state;
    }
    // console.log(tile1, tile2);
    updateTilePosition(stateTile1, tile2.column, tile2.row);
    updateTilePosition(stateTile2, tile1.column, tile1.row);
    state = _.cloneDeep(state);

    return state;
  },

  [REMOVE_GRID_TILES]: (state, action) => {
    state = _.map(state, (tile) => {

      if(!_.includes(action.payload.tiles, tile)) {
        return tile;
      }
      return poolTile(_.clone(tile), -1, -1);
    });
    return state;
  },

  [SHIFT_TILES_DOWN]: (state, action) => {
    let columnNumbers = [];

    _.forEach(action.payload.tiles, (tile) => {
      if (!columnNumbers.includes(tile.column)) {
        columnNumbers = columnNumbers.concat(tile.column);
      }
    });

    _.forEach(columnNumbers, (colNum) => {
      let columnTiles = _.filter(state, {column: colNum});
      columnTiles = _.sortBy(columnTiles, (o) => o.row);
      let rowIndex = 0;
      _.forEach(columnTiles, (colTile) => {
        colTile.row = rowIndex;
        colTile.y = rowIndex * TILE_SIZE
        colTile.id = `${rowIndex}-${colTile.column}`;
        rowIndex++;
      });
    });

    return _.cloneDeep(state);
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const tileInitialState = [];
export function tileReducer (state = tileInitialState, action) {
  const handler = TILE_ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

const gridInitialState = [];
export default function gridReducer (state = gridInitialState, action) {
  const handler = GRID_ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}