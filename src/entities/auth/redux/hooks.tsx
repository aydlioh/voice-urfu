import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './authSlice';
import { RootState, store } from '@/app/redux';

type UserDataType = null | {
  login?: string;
  fullname?: string;
  email?: string;
};

export const useAuthStatus = () => {
  const auth = useSelector((state: RootState) => state.auth);
  return auth;
};

export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const signIn = (userData: UserDataType) => {
    dispatch(login(userData));
  };

  const signOut = () => {
    dispatch(logout());
  };

  return { auth, signIn, signOut };
};

export const refreshAuthStore = () => ({
  signOut: () => store.dispatch(logout()),
  signIn: (userData: UserDataType) => store.dispatch(login(userData)),
});
