import clsx from 'clsx';
import { IconType } from 'react-icons';
import styles from './FriendCardTool.module.css';

type Props = {
  onClick: () => void;
  Icon: IconType;
  className?: string;
};

export const FriendCardTool = ({ onClick, Icon, className }: Props) => {
  return (
    <button onClick={onClick} className={clsx(styles.friendCardBtn, className)}>
      <Icon />
    </button>
  );
};
