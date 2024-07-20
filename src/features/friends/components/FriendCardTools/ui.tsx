import { useState } from 'react';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { FriendCardToolsModal } from '../FriendCardToolsModal';
import { FriendTooltip } from '@/features/friends';
import styles from './ui.module.css';

type Props = {
  user: {
    username: string;
  };
  withDelete: boolean;
};

export const FriendCardTools = ({ user, withDelete }: Props) => {
  const [isModal, setIsModal] = useState(false);

  const toggleModal = () => {
    setIsModal((prev) => !prev);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <FriendTooltip
      isOpen={isModal}
      close={closeModal}
      content={<FriendCardToolsModal withDelete={withDelete} user={user} />}
    >
      <button onClick={toggleModal} className={styles.modalBtn}>
        <FaEllipsisVertical />
      </button>
    </FriendTooltip>
  );
};
