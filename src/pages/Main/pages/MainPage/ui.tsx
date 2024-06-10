import styles from './ui.module.css'

const MainPage = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>
        Привет, <span className={styles.accentTitle}>Voice</span>!
      </h1>
    </section>
  );
};

export default MainPage;
