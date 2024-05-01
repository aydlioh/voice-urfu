import { FormSwitcher } from '@/features/auth';
import { LoginForm } from '@/widgets';

export const LoginPage = () => {
  return (
    <section className="max-w-screen min-h-screen py-10 flex justify-center items-center text-background">
      <div className="md:w-[500px] w-full bg-authForm md:rounded-xl pt-6">
        <h2 className="font-minecraft text-[36px] text-center">Voice</h2>
        <LoginForm />
        <FormSwitcher
          title="Ещё нет аккаунта?"
          subtitle="Зарегистрируйтесь"
          linkTo="/registration"
        />
      </div>
    </section>
  );
};
