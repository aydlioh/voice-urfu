import clsx from 'clsx';
import { useState } from 'react';
import { IconType } from 'react-icons';
import styles from './VideocallTool.module.css';

type Props = {
  defaultActive?: boolean;
  handleToggle: () => void;
  activeIcon: IconType;
  disabledIcon: IconType;
};

export const VideocallTool = ({
  defaultActive = true,
  handleToggle,
  activeIcon,
  disabledIcon,
}: Props) => {
  const [active, setActive] = useState(defaultActive);
  const Icon = active ? activeIcon : disabledIcon;

  const handleClick = () => {
    handleToggle();
    setActive((prev) => !prev);
  };

  return (
    <button onClick={handleClick} className={styles.toolBtn}>
      <Icon className={clsx(!active && styles.disabled)} />
    </button>
  );
};
