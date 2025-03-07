import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: any;
  session: any;
}

const initialState: AuthState = {
  user: {},
  session: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    getSession: (state, action: PayloadAction<any>) => {
      state.session = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.session = null;
    }
  },
});

export const {
  getUser,
  getSession,
  logoutUser
} = authSlice.actions;

export default authSlice.reducer;