import { useModal } from '@/entities/modal';
import { NestedSidebarLink } from '@/features/sidebar';
import { SidebarLink } from '@/shared/common/types';
import clsx from 'clsx';
import styles from './NestedSidebar.module.css';

type Props = {
  nestedLinks: Omit<SidebarLink, 'icon'>[];
  isActive: boolean;
  withLogout?: boolean;
};

export const NestedSidebar = ({
  nestedLinks,
  isActive,
  withLogout = false,
}: Props) => {
  const { open } = useModal();

  return (
    <aside className={clsx(styles.sidebar, isActive && styles.active)}>
      <div className={styles.wrapper}>
        <nav>
          <ul className={styles.navInner}>
            {nestedLinks.map(({ label, path, otherPath }, index) => (
              <li key={index}>
                <NestedSidebarLink
                  otherPath={otherPath}
                  to={path}
                  label={label}
                />
              </li>
            ))}
            {withLogout && (
              <li onClick={open} className={styles.logoutBtn}>
                Выйти из аккаунта
              </li>
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
