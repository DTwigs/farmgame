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
export const POPULATE_TILES = 'resources/POPULATE_GRID_TILES';

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

export function populateResourceTiles () {
  return {
    type: POPULATE_TILES
  }
}
