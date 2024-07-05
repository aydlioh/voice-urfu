import { MdClose } from 'react-icons/md';

type Props = {
  closeToast?: () => void;
};

export const CloseButton = ({ closeToast }: Props) => {
  const closeHandler = () => {
    if (closeToast) {
      closeToast();
    }
  };

  return (
    <div>
      <div
        onClick={closeHandler}
        className="hover:bg-black/10 duration p-1 rounded-full cursor-pointer"
      >
        <MdClose />
      </div>
    </div>
  );
};
