import clsx from 'clsx';
import { useState } from 'react';
import { IconType } from 'react-icons';

type Props = {
  defaultActive?: boolean;
  handleToggle: () => void;
  activeIcon: IconType;
  disabledIcon: IconType;
};

export const VideocallTool = ({
  defaultActive = true,
  handleToggle,
  activeIcon,
  disabledIcon,
}: Props) => {
  const [active, setActive] = useState(defaultActive);
  const Icon = active ? activeIcon : disabledIcon;

  const handleClick = () => {
    handleToggle();
    setActive((prev) => !prev);
  };

  return (
    <button
      onClick={handleClick}
      className="h-12 w-12 flex justify-center items-center p-2 rounded-full hover:bg-page duration-200 cursor-pointer"
    >
      <Icon
        className={clsx(
          'text-[26px]',
          active ? '' : 'text-rose-500'
        )}
      />
    </button>
  );
};
