import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type Props = {
  closeToast?: () => void;
  handleAccept: (sender: string) => void;
  handleRefuse: (sender: string) => void;
  message: {
    sender: string;
    receiver: string;
  };
};

export const FriendRequest = ({
  handleAccept,
  handleRefuse,
  closeToast,
  message,
}: Props) => {
  const navigate = useNavigate();

  const handleOpen = () => {
    if (closeToast) {
      closeToast();
    }
    setTimeout(toast.dismiss, 500);
    navigate('/friends/incoming');
  };

  const acceptHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleAccept(message.sender);
    if (closeToast) {
      closeToast();
    }
    toast.success('Вы приняли заявку в друзья');
  };

  const refuseHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleRefuse(message.sender);
    if (closeToast) {
      closeToast();
    }
    toast.error('Вы отклонили заявку в друзья');
  };

  return (
    <div className="flex flex-row gap-2 cursor-pointer" onMouseUp={handleOpen}>
      <div className="flex flex-col w-full">
        <p className="mb-3">Заявка в друзья от {message.sender}</p>
        <div className="flex flex-row gap-2 items-center">
          <button
            onClick={acceptHandler}
            className="bg-green-300 p-2 rounded-md text-background font-bold w-1/2"
          >
            Принять
          </button>
          <button
            onClick={refuseHandler}
            className="bg-rose-300 p-2 rounded-md text-background font-bold w-1/2"
          >
            Отклонить
          </button>
        </div>
      </div>
    </div>
  );
};
