import {
  extendVariants,
  Textarea as TextareaNextUI,
  TextAreaProps,
} from '@nextui-org/react';

export const Textarea = extendVariants(TextareaNextUI, {
  variants: {
    color: {
      primary: {
        input:
          'data-[has-start-content=true]:ps-4 bg-primary text-secondary placeholder:text-secondary group-data-[has-value=true]:text-secondary',
        innerWrapper: 'bg-primary py-1 flex flex-row gap-1',
        inputWrapper:
          'rounded-md bg-primary data-[hover=true]:bg-primary group-data-[focus=true]:bg-primary',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

export type { TextAreaProps };
