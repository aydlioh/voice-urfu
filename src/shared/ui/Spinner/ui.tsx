import { Spinner as SpinnerNextUI, SpinnerProps } from '@nextui-org/react';

export const Spinner = (props: SpinnerProps) => {
  return (
    <SpinnerNextUI
      size='lg'
      label='Загрузка...'
      {...props}
      classNames={{
        circle1: 'border-b-primaryText',
        circle2: 'border-b-primaryText',
        label: 'font-minecraft text-primaryText',
      }}
    />
  );
};
