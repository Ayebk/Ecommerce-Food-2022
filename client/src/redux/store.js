import { applyMiddleware, createStore, compose } from "redux";
import {thunk} from "redux-thunk";
import allReducers from "../redux/reducers";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "persist-Key",
  storage,
};

const persistedReducer = persistReducer(persistConfig, allReducers);
const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(applyMiddleware(...middlewares));
const store = createStore(persistedReducer, enhancers);
const persistor = persistStore(store);

export default store;
export { persistor };
