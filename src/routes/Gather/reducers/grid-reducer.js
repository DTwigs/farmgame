import { POPULATE_GRID, SELECT_GRID_TILE, UNSELECT_GRID_TILE, SWAP_GRID_TILES } from '../actions.js';
import { buildResourceArray, updateTilePosition } from '../modules/grid-helpers.js';
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
    console.log('the selectening: ', state[tile.column][tile.row]);
    if (state[tile.column][tile.row]) {
      state = _.cloneDeep(state);
      state[tile.column][tile.row].selected = true;
    }
    return state;
  },
  [UNSELECT_GRID_TILE]: (state, action) => {
    const tile = action.payload;
    if (state[tile.column][tile.row]) {
      state = _.cloneDeep(state);
      state[tile.column][tile.row].selected = false;
    }
    return state;
  },
  [SWAP_GRID_TILES]: (state, action) => {
    const tile1 = action.payload.tile1;
    const tile2 = action.payload.tile2;

    if (!state[tile1.column][tile1.row] || !state[tile2.column][tile2.row]) {
      return state;
    }

    state = _.cloneDeep(state);
    const tile1Updated = updateTilePosition(state[tile1.column][tile1.row], tile2.column, tile2.row);
    const tile2Updated = updateTilePosition(state[tile2.column][tile2.row], tile1.column, tile1.row);
    state[tile1.column][tile1.row] = tile2Updated;
    state[tile2.column][tile2.row] = tile1Updated;

    console.log('i got here', state);
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