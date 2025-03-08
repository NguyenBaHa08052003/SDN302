// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import lodgingReducer from './slices/lodgingSlice';
import searchReducer from './slices/searchSlice';
const store = configureStore({
  reducer: {
    userRedux: userReducer,
    lodgingRedux: lodgingReducer,
    search: searchReducer,
  },
});

export default store;
