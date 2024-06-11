import { publicAuthUrls } from './urls';

export const isResponseRefresh = (url: string | undefined) =>
  url === '/RefreshToken';
export const isRequestPrivate = (url: string | undefined) =>
  !Object.values(publicAuthUrls).includes(url ?? '');
