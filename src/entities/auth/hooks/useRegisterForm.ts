import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterInputs, registerSchema, useRegister } from '@/entities/auth';

export const useRegisterForm = () => {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
  });

  const { register, isPending } = useRegister();

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    register(data);
  };

  return {
    submit: handleSubmit(onSubmit),
    register: formRegister,
    errors,
    isPending,
  };
};
