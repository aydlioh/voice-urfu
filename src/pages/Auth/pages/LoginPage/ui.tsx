import { FormSwitcher } from '@/features/auth';
import { LoginForm } from '@/widgets';
import styles from './ui.module.css';

export const LoginPage = () => {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Voice</h2>
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
