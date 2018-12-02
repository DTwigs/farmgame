import { delay } from 'redux-saga';
import { take, put, select, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  UPDATE_POSITION,
  updateMapPosition,
} from '../../routes/Outside/actions.js';
import {
  collisionCheck,
  MAP_TRIGGERS,
} from '../../routes/Outside/modules/outside-helpers.js';

export function* watchUpdatePosition() {
  while (true) {
    const action = yield take(UPDATE_POSITION);
    const trigger = yield call(collisionCheck, action.payload.position);
    if (trigger === MAP_TRIGGERS.gathering) {
      yield put(updateMapPosition(action.payload.position));
      yield put(push('/gather'));
    } else if (trigger !== MAP_TRIGGERS.stop) {
      yield put(updateMapPosition(action.payload.position));
    }
  }
}

export default function* outsideSaga() {
  yield [
    watchUpdatePosition(),
  ]
}