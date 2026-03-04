import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import bookingReducer from './bookingSlice';
import filterReducer from './filterSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
    filters: filterReducer,
  },
});

export default store;
