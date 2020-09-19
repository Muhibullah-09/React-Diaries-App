import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Diary } from '../../interfaces/diary.interface';


const diaries = createSlice({
  name: 'diaries',
  initialState: [] as Diary[],
  reducers: {
    addDiary(state, { payload }: PayloadAction<Diary[]>) {
      const diariesToSave = payload.filter((diary) => {
        return state.findIndex((item) => item.id === diary.id) === -1;
      });
      state.push(...diariesToSave);
    },
    updateDiary(state, { payload }: PayloadAction<Diary>) {
      const { id } = payload;
      const diaryIndex = state.findIndex((diary) => diary.id === id);
      if (diaryIndex !== -1) {
        state.splice(diaryIndex, 1, payload);
      }
    },
  },
});


export const { addDiary, updateDiary } = diaries.actions;
export default diaries.reducer;
// The “diaries” property of our state is an array containing the user’s diaries, so our reducer functions 
// here all work on the state object they receive using array methods. Notice here that we are writing normal 
// “mutative” code when working on the state. This is possible because the reducer functions we create using 
// the createSlice() method are wrapped with Immer’s produce() method. This results in Immer returning a correct 
// immutably updated result for our state regardless of us writing mutative code.