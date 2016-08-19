import { POPULATE_GRID, SELECT_GRID_TILE, UNSELECT_GRID_TILE, SWAP_GRID_TILES, REMOVE_GRID_TILES } from '../actions.js';
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

    updateTilePosition(stateTile1, tile2.column, tile2.row);
    updateTilePosition(stateTile2, tile1.column, tile1.row);
    state = _.cloneDeep(state);

    return state;
  },

  [REMOVE_GRID_TILES]: (state, action) => {
    console.log(state.length)
    state = _.map(state, (tile) => {
      if(!_.includes(action.payload.tiles, tile)) {
        return tile;
      }
    });
    console.log(state.length)
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