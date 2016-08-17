import { POPULATE_GRID, SELECT_GRID_TILE, UNSELECT_GRID_TILE, SWAP_GRID_TILES } from '../actions.js';
import { buildResourceArray, updateTilePosition, findTileIndex } from '../modules/grid-helpers.js';
// ------------------------------------
// Action Handlers
// ------------------------------------


const ACTION_HANDLERS = {
  [POPULATE_GRID]: (state, action) => {
    state = buildResourceArray();
    return state;
  },
  [SELECT_GRID_TILE]: (state, action) => {
    const tile = action.payload;
    const tileIndex = findTileIndex(state, tile.column, tile.row);
    if (tileIndex >= 0) {
      state = _.cloneDeep(state);
      state[tileIndex].selected = true;
    }
    return state;
  },
  [UNSELECT_GRID_TILE]: (state, action) => {
    const tile = action.payload;
    const tileIndex = findTileIndex(state, tile.column, tile.row);
    if (tileIndex >= 0) {
      state = _.cloneDeep(state);
      state[tileIndex].selected = false;
    }
    return state;
  },
  [SWAP_GRID_TILES]: (state, action) => {
    const tile1 = action.payload.tile1;
    const tile2 = action.payload.tile2;

    const tile1Index = findTileIndex(state, tile1.column, tile1.row);
    const tile2Index = findTileIndex(state, tile2.column, tile2.row);

    if (tile1Index < 0 || tile2Index < 0) {
      return state;
    }

    state = _.cloneDeep(state);
    updateTilePosition(state[tile1Index], tile2.column, tile2.row);
    updateTilePosition(state[tile2Index], tile1.column, tile1.row);
    return state;
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = [];
export default function gridReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}