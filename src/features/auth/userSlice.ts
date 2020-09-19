import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../interfaces/user.interface';


const user = createSlice({
  name: 'user',
  initialState: null as User | null,
  reducers: {
    setUser(state, { payload }: PayloadAction<User>) {
      return (state = payload);
    },
  },
});


export const { setUser } = user.actions;
export default user.reducer;
// This creates a slice reducer for the user property in our the application’s store. 
// The setUser reducer function accepts a payload containing user data and updates the state with it. 
// When no data is passed, we set the state’s user property to null.