import { translatedPathnames } from "../const";

export const getPathnameInfoString = (pathname: string) =>
  pathname.slice(1).split('/').map(getTranslatePathname).join(' / ');

const getTranslatePathname = (pathname: string) => {
  return translatedPathnames[pathname] ?? pathname;
};
