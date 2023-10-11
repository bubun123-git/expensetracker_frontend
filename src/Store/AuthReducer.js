import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  isPremium: false,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    isPremium(state, action) {
      state.isPremium = action.payload > 10000;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
