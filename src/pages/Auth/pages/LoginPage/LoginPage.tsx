import { useLogin } from '@/entities/auth/hooks';
import { Button } from '@/shared/ui';

export const LoginPage = () => {
  const login = useLogin();

  return (
    <section className="w-screen h-screen">
      LoginPage
      <Button onClick={login}>Sign In</Button>
    </section>
  );
};
