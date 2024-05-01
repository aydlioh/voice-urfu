import { Button } from '@/shared/ui';
import { ButtonProps } from '@nextui-org/react';

export const SubmitButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      size="lg"
      className="bg-background text-authForm rounded-lg text-[20px] h-14"
    />
  );
};
