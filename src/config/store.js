import { createStore, applyMiddleware, combineReducers } from "redux";
//import playerReducer from '../features/player/reducer'
import mapReducer from "../features/map/reducer";
import ripleyReducer from "../features/ripley/reducer";
import pierceReducer from "../features/pierce/reducer";
//import abedReducer from '../features/abed/reducer'
import ripleyAmmoReducer from "../features/ammo/ripleyAmmo/reducer";
//import abedAmmoReducer from '../features/ammo/abedAmmo/reducer'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  //player: playerReducer,
  map: mapReducer,
  ripley: ripleyReducer,
  pierce: pierceReducer,
  //abed:abedReducer,
  ripleyAmmo: ripleyAmmoReducer
  //abedAmmo:abedAmmoReducer
});

const persistConfig = {
  key: "root",
  storage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// )

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const persistor = persistStore(store);

export default { store, persistor };
