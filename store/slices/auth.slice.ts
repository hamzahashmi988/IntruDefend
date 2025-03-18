import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type UserModel = {};

export interface AuthStateType {
  user: UserModel | null | undefined;
  isAuthenticated: boolean;
  accessToken: null | string | undefined;
  refreshToken: null | string | undefined;
  idToken: null | string | undefined;
}

const initialState: AuthStateType = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  idToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (
      state,
      action: PayloadAction<string | null | undefined>
    ) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (
      state,
      action: PayloadAction<string | null | undefined>
    ) => {
      state.refreshToken = action.payload;
    },
    setIdToken: (state, action: PayloadAction<string | null | undefined>) => {
      state.idToken = action.payload;
    },
    setUser: (state, action: PayloadAction<UserModel | null | undefined>) => {
      state.user = action.payload;
    },
    updateUser: (
      state,
      action: PayloadAction<Partial<UserModel> | null | undefined>
    ) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },

    logout: () => initialState,
  },
});

export const {
  setAccessToken,
  setUser,
  logout,
  setIsAuthenticated,
  setRefreshToken,
  updateUser,
  setIdToken,
} = authSlice.actions;
export default authSlice.reducer;
