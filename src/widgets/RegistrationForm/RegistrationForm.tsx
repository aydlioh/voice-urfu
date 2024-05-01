import { SubmitButton, TextInput, PasswordInput } from '@/features/auth';

export const RegistrationForm = () => {
  return (
    <form className="md:px-20 px-4 pt-10 pb-8 flex flex-col gap-4">
      <TextInput label="Логин" autoComplete="username" />
      <TextInput label="ФИО" autoComplete="username" />
      <TextInput type="email" label="E-mail" autoComplete="username" />
      <PasswordInput label="Пароль" autoComplete="current-password" />
      <SubmitButton>Войти</SubmitButton>
    </form>
  );
};
