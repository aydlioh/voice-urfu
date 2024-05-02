import { useAuthStatus } from '@/entities/auth';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicGuard = () => {
  // TODO Сделать через localStorage, иначе баг роутинга
  const { isAuth } = useAuthStatus();

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
