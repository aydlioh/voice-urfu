import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './authSlice';
import { RootState } from '@/app/redux';

type UserDataType = {
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
