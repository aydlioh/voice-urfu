export const getPathnameInfoString = (pathname: string) => {
  const currentString = pathname.slice(1);
  if (!currentString) return 'Главная страница';
  return currentString.split('/').map(getTranslatePathname).join(' / ');
};

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
