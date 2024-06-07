import clsx from 'clsx';
import { ComponentProps } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = ComponentProps<'button'> & {
  to: string;
};

export const BackButton = ({ to, className, ...props }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate(to);
  };

  return (
    <>
      {location.pathname !== to && (
        <button
          {...props}
          onClick={handleBack}
          className={clsx(
            'sm:h-12 sm:w-12 h-10 w-10 flex justify-center items-center p-2 rounded-full hover:bg-page duration-200',
            className
          )}
        >
          <FaArrowLeft className="sm:text-[24px] text-[20px]" />
        </button>
      )}
    </>
  );
};
