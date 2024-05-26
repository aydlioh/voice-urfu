import { Spinner as SpinnerNextUI, SpinnerProps } from '@nextui-org/react';

export const Spinner = (props: SpinnerProps) => {
  return (
    <SpinnerNextUI
      {...props}
      size="lg"
      label="Загрузка..."
      classNames={{
        circle1: 'border-b-primaryText',
        circle2: 'border-b-primaryText',
        label: 'font-minecraft text-primaryText',
      }}
    />
  );
};
