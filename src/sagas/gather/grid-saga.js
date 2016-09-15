import { delay } from 'redux-saga'
import { take, put, select, call } from 'redux-saga/effects'
import {
  swapGridTiles,
  removeGridTiles,
  updateTile,
  shiftGridTilesDown,
  SWAP_AND_MATCH } from '../../routes/Gather/actions.js';
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
    yield fillEmptyGridSpaces(solvedTiles);
    yield call(delay, ANIMATION_TIME);
    yield put(shiftGridTilesDown(solvedTiles));
    yield findMatches(true);
  } else if (!subsequentTry) {
    return false;
  }
  return true;
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
      const randomIndex = Math.floor(Math.random() * sv.resourceTypes.length);
         let resource = sv.resourceTypes[randomIndex];
      let tile = pooled.pop();
      let row = -1 - x;

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

export default function* gridSaga() {
  yield [
    watchSwapAndMatch()
  ]
}
