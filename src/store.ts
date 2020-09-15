import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Redux/rootreducer';
import { useDispatch } from 'react-redux';

const store = configureStore({
    reducer: rootReducer,
});

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;