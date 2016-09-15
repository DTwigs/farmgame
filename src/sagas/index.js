import gridSaga from './gather/grid-saga.js';

export default function* rootSaga() {
  yield [
    gridSaga()
  ]
}