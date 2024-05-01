import { createSlice } from '@reduxjs/toolkit';

export type AuthState = Readonly<{
  isAuth: boolean;
  name: string;
  login: string;
  email: string;
}>;

const initialState: AuthState = {
  isAuth: false,
  login: 'Aydlioh',
  name: 'Pavel Biryuchev',
  email: 'pavel@mail.ru',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
