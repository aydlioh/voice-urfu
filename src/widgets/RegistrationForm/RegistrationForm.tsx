import { useRegisterForm } from '@/entities/auth';
import { SubmitButton, TextInput, PasswordInput } from '@/features/auth';

export const RegistrationForm = () => {
  const { submit, errors, register } = useRegisterForm();

  return (
    <form
      onSubmit={submit}
      className="md:px-20 px-4 pt-4 pb-8 flex flex-col gap-4"
    >
      <TextInput
        {...register('login')}
        error={errors.login}
        label="Логин"
        autoComplete="username"
      />
      <TextInput
        {...register('fullname')}
        error={errors.fullname}
        label="ФИО"
        autoComplete="fullname"
      />
      <TextInput
        {...register('email')}
        error={errors.email}
        type="email"
        label="E-mail"
        autoComplete="email"
      />
      <PasswordInput
        {...register('password')}
        error={errors.password}
        label="Пароль"
        autoComplete="current-password"
      />
      <SubmitButton>Зарегистрироваться</SubmitButton>
    </form>
  );
};
