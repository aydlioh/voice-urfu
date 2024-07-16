import {
  extendVariants,
  Spinner as SpinnerNextUI,
  SpinnerProps,
} from '@nextui-org/react';

export const Spinner = extendVariants(SpinnerNextUI, {
  variants: {
    color: {
      primary: {
        circle1: 'border-b-primaryText',
        circle2: 'border-b-primaryText',
        label: 'font-minecraft text-primaryText',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'lg',
  },
});

export type { SpinnerProps };
