import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/auth/authSlice";
import { apiSlice } from "./api/apiSlice";

// Configure Redux Persist
const persistConfig = {
  key: "root", // Root key for the persisted state
  storage, // Specify the storage to use (e.g., localStorage or sessionStorage)
  whitelist: ["auth"], // List of reducers to persist (in this case, just 'auth')
};

// Combine reducers
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
});

// Create a persistor object for use in your application
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
