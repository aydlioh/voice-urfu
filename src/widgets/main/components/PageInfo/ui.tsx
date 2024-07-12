import { getPathnameInfoString } from '@/shared/utils';
import { useLocation } from 'react-router-dom';
import styles from './ui.module.css';

export const PageInfo = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.infoWrapper}>
      {pathname === '/' ? 'Главная страница' : getPathnameInfoString(pathname)}
    </div>
  );
};
