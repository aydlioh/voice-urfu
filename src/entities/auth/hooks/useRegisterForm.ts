import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterInputs, registerSchema, useAuth } from '@/entities/auth';

export const useRegisterForm = () => {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    const { login, fullname, email } = data;
    signIn({ login, fullname, email });
    reset({
      login: '',
      password: '',
      fullname: '',
      email: '',
    });
  };

  return { submit: handleSubmit(onSubmit), register, errors };
};
