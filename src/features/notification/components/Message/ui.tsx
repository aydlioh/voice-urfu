import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type Props = {
  closeToast?: () => void;
  message: {
    redirect: string;
    author: string;
    body: string;
    imageSrc?: string;
  };
};

export const Message = ({ closeToast, message }: Props) => {
  const navigate = useNavigate();
  const openChatHandler = () => {
    if (closeToast) {
      closeToast();
    }
    setTimeout(toast.dismiss, 500);
    navigate(message.redirect);
  };

  return (
    <div
      className="flex flex-row gap-2 cursor-pointer"
      onMouseUp={openChatHandler}
    >
      <div className="w-[15%] flex items-start">
        <img
          src="https://chudo-prirody.com/uploads/posts/2023-04/1682578522_chudo-prirody-com-p-kak-spit-panda-foto-1.jpg"
          alt="Logo"
          className="rounded-full h-10 w-10 object-cover"
        />
      </div>
      <div className="flex flex-col w-[85%]">
        <h4 className="font-bold text-[#646cff]">{message.author}</h4>
        <p className="line-clamp-3 text-[12px]">{message.body}</p>
      </div>
    </div>
  );
};
