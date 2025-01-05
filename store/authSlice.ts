import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    token: string | null; // Token is nullable
}

const initialState: AuthState = {
    token: typeof window !== 'undefined' && sessionStorage.getItem('token')
        ? sessionStorage.getItem('token') // Safely load token from sessionStorage
        : null, // Default to null if no token is in sessionStorage or server-side rendering
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload; // Set the token
        },
        clearToken: (state) => {
            state.token = null;
            // sessionStorage.removeItem('token');
        },
    },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;