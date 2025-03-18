import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { rootReducer } from "./slices";

const appReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
    localStorage.clear();
  }
  return rootReducer(state, action);
};

const persistConfig = {
  key: "root",
  whitelist: ["auth"],
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootStateType = ReturnType<typeof rootReducer>;
export type StoreStateType = ReturnType<typeof store.getState>;
export type StoreType = typeof store;
export type ThunkType = ThunkAction<void, RootStateType, unknown, Action>;
