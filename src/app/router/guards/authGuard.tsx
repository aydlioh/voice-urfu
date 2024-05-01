import { Navigate, Outlet } from 'react-router-dom';

export const AuthGuard = () => {
  return <Navigate to="/login" />;

  return <Outlet />;
};
