import { Textarea as TextareaNextUI, TextAreaProps } from '@nextui-org/react';

const classNames = {
  input:
    'data-[has-start-content=true]:ps-4 bg-primary text-secondary placeholder:text-secondary group-data-[has-value=true]:text-secondary',
  innerWrapper: 'bg-primary py-1 flex flex-row gap-1',
  inputWrapper:
    'rounded-md bg-primary data-[hover=true]:bg-primary group-data-[focus=true]:bg-primary',
};

export const Textarea = (props: TextAreaProps) => {
  return <TextareaNextUI {...props} classNames={classNames} />;
};
