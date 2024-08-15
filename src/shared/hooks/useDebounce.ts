import { useEffect } from 'react';

export const useDebounce = <T>(
  value: T,
  changeValue: (v: T) => void,
  delay: number = 330
) => {
  useEffect(() => {
    const t = setTimeout(() => {
      changeValue(value);
    }, delay);

    return () => {
      clearTimeout(t);
    };
  }, [value, delay, changeValue]);
};
