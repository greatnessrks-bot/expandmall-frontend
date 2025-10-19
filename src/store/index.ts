import { configureStore } from '@reduxjs/toolkit';
import businessReducer from './slices/businessSlice';
import selectedBusinessReducer from './slices/selectedBusinessSlice';
import connectionReducer from './slices/connectionSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    businesses: businessReducer,
    selectedBusiness: selectedBusinessReducer,
    connections: connectionReducer,
    user: userReducer,
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;