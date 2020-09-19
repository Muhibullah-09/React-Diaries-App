import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
};


const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};


const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveToken(state, { payload }: PayloadAction<string>) {
      if (payload) {
        state.token = payload;
      }
    },
    clearToken(state) {
      state.token = null;
    },
    setAuthState(state, { payload }: PayloadAction<boolean>) {
      state.isAuthenticated = payload;
    },
  },
});


export const { saveToken, clearToken, setAuthState } = auth.actions;
export default auth.reducer;
// In this file, we’re creating a slice for the auth property of our app’s state using the createSlice() function 
// introduced earlier. The reducers property holds a map of reducer functions for updating values in the auth slice. 
// The returned object contains automatically generated action creators and a single slice reducer. We would need to 
// use these in other files so, following the “ducks pattern”, we do named exports of the action creators, and a 
// default export of the reducer function.
// Let’s set up the remaining reducer slices according to the app state we saw earlier. 
// First, create a file named userSlice.ts in the auth directory and add the following code to it: