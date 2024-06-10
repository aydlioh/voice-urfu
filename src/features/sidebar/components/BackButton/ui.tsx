import clsx from 'clsx';
import { ComponentProps } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ui.module.css';

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
          className={clsx(styles.backBtn, className)}
        >
          <FaArrowLeft />
        </button>
      )}
    </>
  );
};
