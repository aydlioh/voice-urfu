import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginInputs, loginSchema, useLogin } from '@/entities/auth';

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });

  const { login, isPending } = useLogin();

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    login(data);
  };

  return { submit: handleSubmit(onSubmit), register, errors, isPending };
};
