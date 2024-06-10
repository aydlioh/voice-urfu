import { PandaEmptySvg } from '@/shared/assets/svgs';
import styles from './ui.module.css';

const EmptySettingsPage = () => {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <img src={PandaEmptySvg} alt="Panda" className={styles.img} />
        <h1 className={styles.title}>Выберите раздел</h1>
      </div>
    </section>
  );
};

export default EmptySettingsPage;
