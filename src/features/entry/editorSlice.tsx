import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entry } from '../../interfaces/entry.interface';


interface EditorState {
  canEdit: boolean;
  currentlyEditing: Entry | null;
  activeDiaryId: string | null;
};


const initialState: EditorState = {
  canEdit: false,
  currentlyEditing: null,
  activeDiaryId: null,
};


const editor = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setCanEdit(state, { payload }: PayloadAction<boolean>) {
      state.canEdit = payload != null ? payload : !state.canEdit;
    },
    setCurrentlyEditing(state, { payload }: PayloadAction<Entry | null>) {
      state.currentlyEditing = payload;
    },
    setActiveDiaryId(state, { payload }: PayloadAction<string>) {
      state.activeDiaryId = payload;
    },
  },
});


export const {
  setCanEdit,
  setCurrentlyEditing,
  setActiveDiaryId,
} = editor.actions;
export default editor.reducer;
// Here, we have a slice for the editor property in state. We’ll be using the properties 
// in this object to check if the user wants to switch to editing mode, which diary the edited entry belongs to, 
// and what entry is going to be edited.
// To put it all together, create a file named rootReducer.ts in the src directory with the following content: