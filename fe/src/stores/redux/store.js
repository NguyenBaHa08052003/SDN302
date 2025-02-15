// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import lodgingReducer from './slices/lodgingSlice';
const store = configureStore({
  reducer: {
    userRedux: userReducer,
    lodgingRedux: lodgingReducer,
  },
});

export default store;
