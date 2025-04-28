import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth.slice';
import loadingReducer from './loading.slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
