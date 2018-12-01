import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counterReducer from '../routes/Counter/modules/counter'
import gatherReducers from '../routes/Gather/reducers'
import outsideReducers from '../routes/Outside/reducers'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    gather: gatherReducers,
    outside: outsideReducers,
    router,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
