import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // By default, this uses localStorage to persist data

// Redux Persist Configuration for the auth slice
const persistConfig = {
    key: "auth", // Key to save the persisted state
    storage, // Use localStorage or sessionStorage
};

// Wrap the auth reducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: {
        auth: persistedAuthReducer, // Set the persisted reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Ignore serializability warnings for redux-persist
        }),
});

export const persistor = persistStore(store); // Create the persistor for the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;