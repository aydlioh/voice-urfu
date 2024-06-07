import { useAuth } from '@/entities/auth';
import { TokenService, UserService } from '@/shared/api/services';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicGuard = () => {
  const { signIn } = useAuth();

  useEffect(() => {
    if (TokenService.hasToken()) {
      signIn(UserService.get());
    }
  }, [signIn]);

  if (TokenService.hasToken()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
