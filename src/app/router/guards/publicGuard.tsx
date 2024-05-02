import { useAuthStatus } from '@/entities/auth';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicGuard = () => {
  const { isAuth } = useAuthStatus();

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
