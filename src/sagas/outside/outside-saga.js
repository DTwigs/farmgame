import { delay } from 'redux-saga';
import { take, put, select, call } from 'redux-saga/effects';
import {
  UPDATE_POSITION,
  updateMapPosition,
  updateCanGather,
  updateCanFish,
} from '../../routes/Outside/actions.js';
import {
  collisionCheck,
  MAP_TRIGGERS,
} from '../../routes/Outside/modules/outside-helpers.js';

export function* watchUpdatePosition() {
  while (true) {
    const action = yield take(UPDATE_POSITION);
    let trigger = yield call(collisionCheck, action.payload.position);

    if (trigger === MAP_TRIGGERS.gathering) {
      yield put(updateCanGather(true));
    } else {
      yield put(updateCanGather(false));
    }

    if (trigger === MAP_TRIGGERS.fishing) {
      yield put(updateCanFish(true));
      trigger = MAP_TRIGGERS.stop;
    } else {
      yield put(updateCanFish(false));
    }

    if (trigger !== MAP_TRIGGERS.stop) {
      yield put(updateMapPosition(action.payload.position));
    }
  }
}

export default function* outsideSaga() {
  yield [
    watchUpdatePosition(),
  ]
}