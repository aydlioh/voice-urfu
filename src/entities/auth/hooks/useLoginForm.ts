import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginInputs, loginSchema, useAuth } from '@/entities/auth';

export const useLoginForm = () => {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    const { login } = data;
    signIn({ login });
    reset({
      login: '',
      password: '',
    });
  };

  return { submit: handleSubmit(onSubmit), register, errors };
};
