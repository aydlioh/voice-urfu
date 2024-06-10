import { useRegisterForm } from '@/entities/auth';
import { PasswordInput } from '@/features/auth';
import { Button, Input } from '@/shared/ui';
import styles from './ui.module.css';

export const RegistrationForm = () => {
  const { submit, errors, register, isPending, fetchError } = useRegisterForm();

  const isUserNameError = errors.userName !== undefined || Boolean(fetchError);
  const isFullNameError = errors.fullname !== undefined || Boolean(fetchError);
  const isEmailError = errors.email !== undefined || Boolean(fetchError);
  const isPasswordError = errors.password !== undefined || Boolean(fetchError);

  return (
    <form onSubmit={submit} className={styles.registerWrapper}>
      <Input
        {...register('userName')}
        isInvalid={isUserNameError}
        color={isUserNameError ? 'danger' : 'default'}
        errorMessage={errors.userName?.message}
        label="Логин"
        autoComplete="username"
        variant="bordered"
      />
      <Input
        {...register('fullname')}
        isInvalid={isFullNameError}
        color={isFullNameError ? 'danger' : 'default'}
        errorMessage={errors.fullname?.message}
        label="ФИО"
        autoComplete="fullname"
        classNames={{
          input: 'capitalize',
        }}
        variant="bordered"
      />
      <Input
        {...register('email')}
        isInvalid={isEmailError}
        color={isEmailError ? 'danger' : 'default'}
        errorMessage={errors.email?.message}
        type="email"
        label="E-mail"
        autoComplete="email"
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
        Зарегистрироваться
      </Button>
    </form>
  );
};
