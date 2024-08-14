import { getPathnameInfoString } from '@/shared/common/utils';
import { useLocation } from 'react-router-dom';
import styles from './PageInfo.module.css';

export const PageInfo = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.infoWrapper}>
      {pathname === '/' ? 'Главная страница' : getPathnameInfoString(pathname)}
    </div>
  );
};
