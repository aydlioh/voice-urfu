import { createSlice } from '@reduxjs/toolkit';

export type AuthState = Readonly<{
  isAuth: boolean;
  fullname: string;
  login: string;
  email: string;
}>;

const initialState: AuthState = {
  isAuth: false,
  login: '',
  fullname: '',
  email: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, data) => {
      state.isAuth = true;
      state.email = data.payload.email || '';
      state.login = data.payload.login || '';
      state.fullname = data.payload.fullname || '';
    },
    logout: (state) => {
      state.isAuth = false;
      state.email = '';
      state.login = '';
      state.fullname = '';
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
