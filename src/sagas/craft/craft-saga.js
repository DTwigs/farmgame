import { delay } from 'redux-saga'
import { take, put, select, call } from 'redux-saga/effects'
import {
  deductRecipeCost,
  CRAFT_RECIPE
} from '../../routes/Camp/actions.js';

export function* watchCraftRecipe() {
  while (true) {
    const action = yield take(CRAFT_RECIPE);
    const cost = action.payload.cost;
    console.log(cost);
    yield put(deductRecipeCost(cost));
  }
}

export default function* craftSaga() {
  yield [
    watchCraftRecipe(),
  ]
}