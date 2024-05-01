import { useDispatch, useSelector } from 'react-redux';
import { login } from './authSlice';
import { RootState } from '@/app/redux';

export const useLogin = () => {
  const dispatch = useDispatch();

  const loginHandler = () => {
    dispatch(login());
  };

  return loginHandler;
};

export const useAuthStatus = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  return isAuth;
};

export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);
  return auth;
};
