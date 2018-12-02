import gridSaga from './gather/grid-saga.js';
import outsideSaga from './outside/outside-saga.js';

export default function* rootSaga() {
  yield [
    gridSaga(),
    outsideSaga(),
  ]
}