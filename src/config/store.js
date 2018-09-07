import { createStore, combineReducers } from 'redux'
import playerReducer from '../features/player/reducer'
import mapReducer from '../features/map/reducer'
import ripleyReducer from '../features/ripley/reducer'
import pierceReducer from '../features/pierce/reducer'
import abedReducer from '../features/abed/reducer'

const rootReducer = combineReducers({
  player: playerReducer,
  map: mapReducer,
  ripley: ripleyReducer,
  pierce:pierceReducer,
  abed:abedReducer,
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store