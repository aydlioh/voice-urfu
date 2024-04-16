import { Header } from '@/widgets/Header';
import { Outlet } from 'react-router-dom';
import styles from './PageLayout.module.css';

export const PageLayout = () => {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <Outlet />
      </main>
    </>
  );
};
