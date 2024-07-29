export * from './dayjs';
import { translatedPathnames } from '../const';

export const getPathnameInfoString = (pathname: string) =>
  pathname
    .split('/')
    .filter((el) => el !== 'all')
    .filter(Boolean)
    .map(getTranslatePathname)
    .join(' / ');

const getTranslatePathname = (pathname: string) => {
  return translatedPathnames[pathname] ?? pathname;
};
