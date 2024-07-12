import { FormSwitcher } from '@/features/auth';
import { RegistrationForm } from '@/widgets/auth';
import styles from './ui.module.css';

export const RegistrationPage = () => {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Voice</h2>
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
