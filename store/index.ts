import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { rootReducer } from "./slices";
import type { RootState } from "./slices";

const persistConfig = {
  key: "root",
  whitelist: ["auth"],
  storage: AsyncStorage,
};

const appReducer = (state: RootState | undefined, action: any) => {
  if (action.type === "auth/clearAuthData") {
    AsyncStorage.clear();
    state = undefined;
  }
  return rootReducer(state, action);
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

export type { RootState };
export type AppDispatch = typeof store.dispatch;
