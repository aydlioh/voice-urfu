import { useState } from 'react';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { FriendCardToolsModal } from '../FriendCardToolsModal';
import styles from './ui.module.css';

type Props = {
  user: {
    username: string;
  };
};

export const FriendCardTools = ({ user }: Props) => {
  const [isModal, setIsModal] = useState(false);

  const toggleModal = () => {
    setIsModal((prev) => !prev);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <div className="relative">
      <button onClick={toggleModal} className={styles.modalBtn}>
        <FaEllipsisVertical />
      </button>
      {isModal && (
        <FriendCardToolsModal user={user} close={closeModal} isOpen={isModal} />
      )}
    </div>
  );
};
