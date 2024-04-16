import { NextUIProvider } from '@nextui-org/react';

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};
