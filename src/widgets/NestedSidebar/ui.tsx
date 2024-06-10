import { useModal } from '@/entities/modal';
import { NestedSidebarLink } from '@/features/sidebar';
import { SidebarLink } from '@/shared/types';
import clsx from 'clsx';
import styles from './ui.module.css';

type Props = {
  nestedLinks: Omit<SidebarLink, 'icon'>[];
  isActive: boolean;
};

export const NestedSidebar = ({ nestedLinks, isActive }: Props) => {
  const { open } = useModal();

  return (
    <aside className={clsx(styles.sidebar, isActive && styles.active)}>
      <div className={styles.wrapper}>
        <nav>
          <ul className={styles.navInner}>
            {nestedLinks.map(({ label, path }, index) => (
              <li key={index}>
                <NestedSidebarLink to={path} label={label} />
              </li>
            ))}
            <li onClick={open} className={styles.logoutBtn}>
              Выйти из аккаунта
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};
