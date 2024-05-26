export const getPathnameInfoString = (pathname: string) =>
  pathname.slice(1).split('/').map(getTranslatePathname).join(' / ');

const getTranslatePathname = (pathname: string) => {
  switch (pathname) {
    case 'messenger':
      return 'Чаты';
    case 'settings':
      return 'Настройки';
    case 'rooms':
      return 'Комнаты';
    default:
      return pathname;
  }
};
