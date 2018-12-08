import gridSaga from './gather/grid-saga.js';
import outsideSaga from './outside/outside-saga.js';
import craftSaga from './craft/craft-saga.js';

export default function* rootSaga() {
  yield [
    gridSaga(),
    outsideSaga(),
    craftSaga(),
  ]
}