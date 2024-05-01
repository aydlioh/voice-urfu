import { useLogin } from '@/entities/auth/hooks';
import { Button } from '@/shared/ui';

export const RegistrationPage = () => {
  const login = useLogin();

  return (
    <section className="w-screen h-screen">
      Registration Page
      <Button onClick={login}>Sign In</Button>
    </section>
  );
};
