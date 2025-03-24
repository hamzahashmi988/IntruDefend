import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface UserData {
  address: string;
  alternate_phone_no: string;
  email: string;
  face_encoding: number[];
  image_url: string;
  name: string;
  phone_no: string;
}

export interface AuthState {
  firebase_token: string | null;
  jwt: string | null;
  message: string | null;
  uid: string | null;
  user_data: UserData | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  firebase_token: null,
  jwt: null,
  message: null,
  uid: null,
  user_data: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<Partial<AuthState>>) => {
      return { ...state, ...action.payload, isAuthenticated: true };
    },
    logout: () => initialState,
  },
});

export const { setAuthData, logout } = authSlice.actions;
export default authSlice.reducer;
