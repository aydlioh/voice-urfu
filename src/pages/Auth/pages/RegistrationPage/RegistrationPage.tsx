import { FormSwitcher } from '@/features/auth';
import { RegistrationForm } from '@/widgets';

export const RegistrationPage = () => {
  return (
    <section className="max-w-screen min-h-screen py-10 flex justify-center items-center text-background">
      <div className="sm:w-[500px] w-full bg-authForm sm:rounded-xl pt-6">
        <h2 className="font-minecraft text-[36px] text-center">Voice</h2>
        <RegistrationForm />
        <FormSwitcher
          title="Уже есть аккаунт?"
          subtitle="Авторизуйтесь"
          linkTo="/login"
        />
      </div>
    </section>
  );
};
