import { configureStore } from '@reduxjs/toolkit';
import StuReducer from './reducer';

const store = configureStore({
  reducer: StuReducer,
});
export default store;
