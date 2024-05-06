import { PasswordInput } from '@/features/auth';
import { useLoginForm } from '@/entities/auth';
import { Button, Input } from '@/shared/ui';

export const LoginForm = () => {
  const { submit, errors, register } = useLoginForm();

  return (
    <form
      onSubmit={submit}
      className="md:px-20 px-4 pt-10 pb-8 flex flex-col gap-4"
    >
      <Input
        isInvalid={errors.login !== undefined}
        color={errors.login !== undefined ? 'danger' : 'default'}
        errorMessage={errors.login?.message}
        {...register('login')}
        label="Логин / E-mail"
        autoComplete="username"
        variant="bordered"
      />
      <PasswordInput
        isInvalid={errors.password !== undefined}
        color={errors.password !== undefined ? 'danger' : 'default'}
        errorMessage={errors.password?.message}
        {...register('password')}
        label="Пароль"
        autoComplete="current-password"
      />
      <Button size='lg' type="submit" color="primary">
        Войти
      </Button>
    </form>
  );
};
