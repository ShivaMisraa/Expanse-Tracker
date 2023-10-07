import { createSlice } from '@reduxjs/toolkit';

// Check if a token exists in session storage or local storage
const initialToken = sessionStorage.getItem('authToken') || localStorage.getItem('authToken');

const initialState = {
  isLoggedIn: Boolean(initialToken), // Check if a token exists
  token: initialToken || null,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem('authToken', action.payload);

      console.log(state.token);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem('authToken');
    },
  },
});

export const { loginAction, logout } = authSlice.actions;

export default authSlice.reducer;
