import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/services/authSlice';
import {apiSlice} from './api/apiSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: defaultMiddleware =>
    defaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
