import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../Features/auth/AuthSlice';
import userReducer from '../Features/auth/UserSlice';
import diariesReducer from '../Features/diary/DiariesSlice';
import entriesReducer from '../Features/entry/EntriesSlice';
import editorReducer from '../Features/entry/EditorSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    diaries: diariesReducer,
    entries: entriesReducer,
    user: userReducer,
    editor: editorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
