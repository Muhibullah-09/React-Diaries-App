import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { useDispatch } from 'react-redux';
const store = configureStore({
  reducer: rootReducer,
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
// With this, we’ve created a store using the configureStore() export from Redux toolkit. 
// We’ve also exported an hook called useAppDispatch() which merely returns a typed useDispatch() hook.