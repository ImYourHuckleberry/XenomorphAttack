import { createStore, combineReducers } from 'redux'
//import playerReducer from '../features/player/reducer'
import mapReducer from '../features/map/reducer'
import ripleyReducer from '../features/ripley/reducer'
import pierceReducer from '../features/pierce/reducer'
//import abedReducer from '../features/abed/reducer'
import ripleyAmmoReducer from '../features/ammo/ripleyAmmo/reducer'
//import abedAmmoReducer from '../features/ammo/abedAmmo/reducer'

const rootReducer = combineReducers({
  //player: playerReducer,
  map: mapReducer,
  ripley: ripleyReducer,
  pierce:pierceReducer,
  //abed:abedReducer,
  ripleyAmmo:ripleyAmmoReducer,
  //abedAmmo:abedAmmoReducer
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store