import { PandaSvg } from '@/shared/assets/svgs';
import { Link } from 'react-router-dom';
import styles from './ui.module.css';
import clsx from 'clsx';

type FormSwitcherProps = {
  title: string;
  subtitle: string;
  linkTo: string;
};

export const FormSwitcher = ({
  title,
  subtitle,
  linkTo,
}: FormSwitcherProps) => {
  return (
    <div className='sm:max-w-[500px] max-w-[370px]'>
      <div className="text-[14px] sm:px-20 px-4 flex justify-end">
        <div
          className={clsx(
            'flex justify-center gap-2 bg-authFormSecondary py-4 px-2 w-[300px] rounded-3xl',
            styles.triangle
          )}
        >
          <p>{title}</p>
          <Link className="text-links hover:underline" to={linkTo}>
            {subtitle}
          </Link>
        </div>
      </div>
      <div className="ml-8 mb-5 md:mt-2 mt-5">
        <img src={PandaSvg} alt="Panda" />
      </div>
    </div>
  );
};
