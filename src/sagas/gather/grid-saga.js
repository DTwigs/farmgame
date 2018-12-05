import { delay } from 'redux-saga'
import { take, put, select, call } from 'redux-saga/effects'
import {
  swapGridTiles,
  removeGridTiles,
  updateTile,
  shiftGridTilesDown,
  addTile,
  clearAllTiles,
  updateResourceQuantity,
  SWAP_AND_MATCH,
  POPULATE_TILES } from '../../routes/Gather/actions.js';
import {
  getAllSolvedMatches,
  gatherStateSelector,
  ANIMATION_TIME
} from '../../routes/Gather/modules/grid-helpers.js';

function* findMatches(subsequentTry = false) {
  const state = yield select((state) => state.gather.grid);
  const solvedTiles = yield call(getAllSolvedMatches, state);
  if (solvedTiles.length >= 3) {
    yield call(delay, ANIMATION_TIME);
    yield put(removeGridTiles(solvedTiles));
    yield call(tallyUpResources, solvedTiles);
    yield fillEmptyGridSpaces(solvedTiles);
    yield call(delay, ANIMATION_TIME);
    yield put(shiftGridTilesDown(solvedTiles));
    yield findMatches(true);
  } else if (!subsequentTry) {
    return false;
  }
  return true;
}

function* tallyUpResources(solvedTiles) {
  for (let i = 0; i < solvedTiles.length; i++) {

    yield put(updateResourceQuantity(solvedTiles[i].resource.type, solvedTiles[i].resource.value))
    yield call(delay, ANIMATION_TIME / 4);
  }
}

function* fillEmptyGridSpaces(solvedTiles) {
  const sv = yield select(gatherStateSelector);

  let columns = _.uniq(_.map(solvedTiles, (tile) => tile.column));
  let pooled = _.filter(sv.grid, {pooled: true});

  for (let i = 0; i < columns.length; i++) {
    let col = columns[i];
    let column = _.filter(sv.grid, {column: col});
    let emptySpaces = sv.gridHeight - column.length;

    // Grab a pooled tile and update its position to sit over the column
    // it will drop down into.
    for (let x = 0; x < emptySpaces; x++) {
      const randomIndex = Math.floor(Math.random() * sv.resourceTypes.length),
        randomPoolIndex = Math.floor(Math.random() * pooled.length),
        resource = sv.resourceTypes[randomIndex],
        tile = pooled[randomPoolIndex],
        row = -1 - x;

      pooled.splice(randomPoolIndex, 1);

      yield put(updateTile(tile, row, col, false, resource));
    }
  }
}

export function* watchSwapAndMatch() {
  while (true) {
    const action = yield take(SWAP_AND_MATCH);
    yield put(swapGridTiles(action.tile1, action.tile2));

    const matchesFound = yield findMatches();
    if (!matchesFound) {
      yield call(delay, ANIMATION_TIME);
      yield put(swapGridTiles(action.tile1, action.tile2));
    }
  }
}

function* populateTiles() {
  let sv = yield select(gatherStateSelector);
  let row, column;
  let totalTiles = sv.gridWidth * sv.gridHeight;

  yield put(clearAllTiles())
  // Add tiles and randomize the resource of each tile
  for (row = 0; row < sv.gridWidth; row++) {
    for (column = 0; column < sv.gridHeight; column++) {
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
      yield put(addTile(tile, row, column));
      sv = yield select(gatherStateSelector);
    }
  }

  // Add pooled tiles
  for (let tileCount = 0; tileCount < totalTiles; tileCount++) {
    let tile = {
      pooled: true,
      resource: sv.resourceTypes[0]
    }
    yield put(addTile(tile, -1, -1));
  }
}

export function* watchPopulateTiles() {
  while (true) {
    yield take(POPULATE_TILES);
    yield call(populateTiles);
  }
}

export default function* gridSaga() {
  yield [
    watchPopulateTiles(),
    watchSwapAndMatch()
  ]
}
