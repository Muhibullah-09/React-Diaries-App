import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/auth/userSlice';
import diariesReducer from './features/diary/diariesSlice';
import entriesReducer from './features/entry/entriesSlice';
import editorReducer from './features/entry/editorSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  diaries: diariesReducer,
  entries: entriesReducer,
  user: userReducer,
  editor: editorReducer,
});


export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
// In this file, we’ve combined our slice reducers into a single root reducer with the combineReducers() function. 
// We’ve also exported the RootState type, which will be useful later when we’re selecting values from the store. 
// We can now use the root reducer (the default export of this file) to set up our store.