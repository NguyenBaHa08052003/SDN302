// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    userRedux: userReducer,
  },
});

export default store;
