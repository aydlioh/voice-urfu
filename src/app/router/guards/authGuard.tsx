import { useAuthStatus } from '@/entities/auth';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthGuard = () => {
  const { isAuth } = useAuthStatus();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
