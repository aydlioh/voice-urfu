import { PasswordInput } from '@/features/auth';
import { useLoginForm } from '@/entities/auth';
import { Button, Input } from '@/shared/ui';
import styles from './ui.module.css';

export const LoginForm = () => {
  const { submit, errors, register, isPending } = useLoginForm();

  return (
    <form
      onSubmit={submit}
      className={styles.loginWrapper}
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
      <Button isLoading={isPending} size="lg" type="submit" color="primary">
        Войти
      </Button>
    </form>
  );
};
