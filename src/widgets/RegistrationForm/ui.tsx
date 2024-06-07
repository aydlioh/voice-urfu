import { useRegisterForm } from '@/entities/auth';
import { PasswordInput } from '@/features/auth';
import { Button, Input } from '@/shared/ui';

export const RegistrationForm = () => {
  const { submit, errors, register, isPending } = useRegisterForm();

  return (
    <form
      onSubmit={submit}
      className="md:px-20 px-4 pt-4 pb-8 flex flex-col gap-4"
    >
      <Input
        {...register('userName')}
        isInvalid={errors.userName !== undefined}
        color={errors.userName !== undefined ? 'danger' : 'default'}
        errorMessage={errors.userName?.message}
        label="Логин"
        autoComplete="username"
        variant="bordered"
      />
      <Input
        {...register('fullname')}
        isInvalid={errors.fullname !== undefined}
        color={errors.fullname !== undefined ? 'danger' : 'default'}
        errorMessage={errors.fullname?.message}
        label="ФИО"
        autoComplete="fullname"
        variant="bordered"
      />
      <Input
        {...register('email')}
        isInvalid={errors.email !== undefined}
        color={errors.email !== undefined ? 'danger' : 'default'}
        errorMessage={errors.email?.message}
        type="email"
        label="E-mail"
        autoComplete="email"
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
        Зарегистрироваться
      </Button>
    </form>
  );
};
