import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entry } from '../../interfaces/entry.interface';


const entries = createSlice({
  name: 'entries',
  initialState: [] as Entry[],
  reducers: {
    setEntries(state, { payload }: PayloadAction<Entry[] | null>) {
      return (state = payload != null ? payload : []);
    },
    updateEntry(state, { payload }: PayloadAction<Entry>) {
      const { id } = payload;
      const index = state.findIndex((e) => e.id === id);
      if (index !== -1) {
        state.splice(index, 1, payload);
      }
    },
  },
});


export const { setEntries, updateEntry } = entries.actions;
export default entries.reducer;
// The reducer functions here have logic similar to the previous slice’s reducer functions. 
// The entries property is also an array, but it only holds entries for a single diary. In our app, 
// this will be the diary currently in the user’s focus.
// Finally, create a file named editorSlice.ts in src/features/entry and add the following to it: