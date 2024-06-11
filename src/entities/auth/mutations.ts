import { useMutation } from '@tanstack/react-query';
import { login, logout, register } from './api';
import { useNavigate } from 'react-router-dom';
import { TokenService, UserService } from '@/shared/api/services';
import { useAuth } from './redux';

export const useRegister = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending, error } = useMutation({
    mutationKey: ['auth/register'],
    mutationFn: register,
    onSuccess: (response) => {
      if (response?.status === 200) {
        navigate('/login');
      }
    },
  });

  return { register: mutateAsync, isPending, error };
};

export const useLogin = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending, error } = useMutation({
    mutationKey: ['auth/login'],
    mutationFn: login,
    onSuccess: (response) => {
      if (response?.status === 200) {
        TokenService.save(response.data.tokens);
        UserService.save(response.data.user);
        navigate('/');
      }
    },
  });

  return { login: mutateAsync, isPending, error };
};

export const useLogout = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ['auth/logout'],
    mutationFn: logout,
    onSuccess: (response) => {
      if (response?.status === 200) {
        TokenService.destroy();
        UserService.destroy();
        signOut();
        navigate('/login');
      }
    },
  });

  return { logout: mutate, isPending };
};
