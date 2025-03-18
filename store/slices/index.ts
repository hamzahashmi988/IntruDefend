export * from "./auth.slice";

import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./auth.slice";

export const rootReducer = combineReducers({
  auth: authSlice,
});

export * from "./auth.slice";
