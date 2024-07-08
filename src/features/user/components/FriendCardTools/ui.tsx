import { useState } from 'react';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { FriendCardToolsModal } from '../FriendCardToolsModal';

type Props = {
  user: {
    login: string;
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
      <button
        onClick={toggleModal}
        className="flex justify-center items-center p-2 rounded-full hover:bg-background/70 duration-200 sm:text-[26px] text-[24px] text-primaryText/70"
      >
        <FaEllipsisVertical />
      </button>
      {isModal && (
        <FriendCardToolsModal user={user} close={closeModal} isOpen={isModal} />
      )}
    </div>
  );
};
