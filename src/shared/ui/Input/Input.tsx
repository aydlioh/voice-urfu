import {
  extendVariants,
  Input as InputNextUI,
  InputProps,
} from '@nextui-org/react';

export const Input = extendVariants(InputNextUI, {
  variants: {
    color: {
      primary: {
        clearButton: 'text-secondary hover:scale-[115%] transition',
        input:
          'data-[has-start-content=true]:ps-4 bg-primary text-secondary placeholder:text-secondary/50 group-data-[has-value=true]:text-secondary font-thin',
        innerWrapper: 'bg-primary py-1',
        inputWrapper:
          'rounded-md bg-primary data-[hover=true]:bg-primary group-data-[focus=true]:bg-primary',
      },
      secondary: {
        clearButton: 'text-secondary hover:scale-[115%] transition',
        input:
          'data-[has-start-content=true]:ps-4 bg-page text-secondary placeholder:text-secondary/50 group-data-[has-value=true]:text-secondary font-thin',
        innerWrapper: 'bg-page py-1',
        inputWrapper:
          'rounded-md bg-page data-[hover=true]:bg-page group-data-[focus=true]:bg-page',
      },
    },
    variant: {
      bordered: {
        clearButton: 'text-secondary hover:scale-[115%] transition',
        inputWrapper:
          'border-default-400 data-[hover=true]:border-background group-data-[focus=true]:border-background',
      },
    },
  },
  defaultVariants: {
    variant: 'flat',
    color: 'primary',
    size: 'md',
  },
});

export type { InputProps };
