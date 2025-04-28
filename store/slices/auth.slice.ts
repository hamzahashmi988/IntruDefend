import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
    name: string;
    email: string;
    image_url?: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    access_token: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    access_token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<{ user: User; access_token: string }>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.access_token = action.payload.access_token;
        },
        clearAuthData: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.access_token = null;
        },
    },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
