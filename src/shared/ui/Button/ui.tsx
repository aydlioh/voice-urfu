import {
  Button as ButtonNextUI,
  extendVariants,
  ButtonProps,
} from '@nextui-org/react';

export const Button = extendVariants(ButtonNextUI, {
  variants: {
    color: {
      primary: 'bg-primary text-secondary',
      secondary: 'bg-pageNested text-secondary hover:bg-pageNested/70',
      danger: 'bg-rose-500 text-secondary',
    },
    variant: {
      bordered:
        'border-primary hover:bg-primary hover:text-white bg-white text-primary',
    },
    radius: {
      default: 'rounded-md',
    },
  },
  defaultVariants: {
    radius: 'default',
    color: 'primary',
    size: 'lg',
  },
});

export type { ButtonProps };
