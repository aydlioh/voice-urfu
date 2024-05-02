import { SubmitButton, TextInput, PasswordInput } from '@/features/auth';
import { useLoginForm } from '@/entities/auth';

export const LoginForm = () => {
  const { submit, errors, register } = useLoginForm();

  return (
    <form
      onSubmit={submit}
      className="md:px-20 px-4 pt-10 pb-8 flex flex-col gap-4"
    >
      <TextInput
        {...register('login')}
        error={errors.login}
        label="Логин / E-mail"
        autoComplete="username"
      />
      <PasswordInput
        {...register('password')}
        error={errors.password}
        label="Пароль"
        autoComplete="current-password"
      />
      <SubmitButton>Войти</SubmitButton>
    </form>
  );
};
