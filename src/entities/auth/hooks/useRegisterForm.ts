import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterInputs, registerSchema, useRegister } from '@/entities/auth';
import { useEffect, useState } from 'react';

export const useRegisterForm = () => {
  const {
    register: formRegister,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
  });
  const [fetchError, setFetchError] = useState('');
  const { register, isPending, error } = useRegister();

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    register(data).finally(() =>
      reset({
        userName: '',
        fullname: '',
        email: '',
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
    register: formRegister,
    errors,
    isPending,
    fetchError,
  };
};
