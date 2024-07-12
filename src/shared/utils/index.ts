import { translatedPathnames } from '../const';

export const getPathnameInfoString = (pathname: string) =>
  pathname
    .replace('all', '')
    .split('/')
    .filter(Boolean)
    .map(getTranslatePathname)
    .join(' / ');

const getTranslatePathname = (pathname: string) => {
  return translatedPathnames[pathname] ?? pathname;
};
