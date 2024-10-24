import { configureStore} from "@reduxjs/toolkit"
import allReducers from "../redux/reducers";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import rootReducer from "../redux/reducers";

const persistConfig = {
  key: "persist-Key",
  storage,
};

const persistedReducer = persistReducer(persistConfig, allReducers);


const store = configureStore({reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})


const persistor = persistStore(store);


export default store;
export { persistor };
