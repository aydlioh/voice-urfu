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
    case 'microphone':
      return 'Микрофон'
    case 'camera':
      return 'Камера'
    case 'security':
      return 'Конфиденциальность'
    case 'profile':
      return 'Профиль'
    case 'theme':
      return 'Тема'
    default:
      return pathname;
  }
};
