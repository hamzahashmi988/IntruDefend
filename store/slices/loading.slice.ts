import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
    isLoading: boolean;
    loadingText?: string;
}

const initialState: LoadingState = {
    isLoading: false,
    loadingText: undefined,
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean | { isLoading: boolean; text?: string }>) => {
            if (typeof action.payload === 'boolean') {
                state.isLoading = action.payload;
                state.loadingText = undefined;
            } else {
                state.isLoading = action.payload.isLoading;
                state.loadingText = action.payload.text;
            }
        },
    },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
