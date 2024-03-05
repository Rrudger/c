import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './mainSlice.js';

export default configureStore({
  reducer: {
    mainState: mainReducer,
  },
});
