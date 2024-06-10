import { PasswordInput } from '@/features/auth';
import { useLoginForm } from '@/entities/auth';
import { Button, Input } from '@/shared/ui';
import styles from './ui.module.css';

export const LoginForm = () => {
  const { submit, errors, register, isPending, fetchError } = useLoginForm();

  const isLoginError = errors.login !== undefined || Boolean(fetchError);
  const isPasswordError = errors.password !== undefined || Boolean(fetchError);

  return (
    <form onSubmit={submit} className={styles.loginWrapper}>
      <Input
        isInvalid={isLoginError}
        color={isLoginError ? 'danger' : 'default'}
        errorMessage={errors.login?.message}
        {...register('login')}
        label="Логин / E-mail"
        autoComplete="username"
        variant="bordered"
      />
      <PasswordInput
        isInvalid={isPasswordError}
        color={isPasswordError ? 'danger' : 'default'}
        errorMessage={errors.password?.message || fetchError}
        {...register('password')}
        label="Пароль"
        autoComplete="current-password"
      />
      <Button isLoading={isPending} size="lg" type="submit" color="primary">
        Войти
      </Button>
    </form>
  );
};
