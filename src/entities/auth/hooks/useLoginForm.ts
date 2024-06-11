import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginInputs, loginSchema, useLogin } from '@/entities/auth';
import { useEffect, useState } from 'react';

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });
  const [fetchError, setFetchError] = useState('');
  const { login, isPending, error } = useLogin();

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    login(data).finally(() =>
      reset({
        login: '',
        password: '',
      })
    );
  };

  useEffect(() => {
    if (error?.message) {
      setFetchError(error?.message);
      setTimeout(() => {
        setFetchError('');
      }, 4000);
    }
  }, [error]);

  return {
    submit: handleSubmit(onSubmit),
    register,
    errors,
    isPending,
    fetchError,
  };
};
