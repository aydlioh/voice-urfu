import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { TokenService, UserService } from '../services';
import { authHttp } from '../instance';
import { isResponseRefresh } from '../utils';
import { refreshAuthStore } from '@/entities/auth';

const refreshTokens = async () => {
  const { signIn, signOut } = refreshAuthStore();

  try {
    const tokens = TokenService.get();

    if (!tokens) return;

    const { jwtToken, refreshToken } = tokens;

    if (!jwtToken || !refreshToken) return;

    const response = await authHttp.post('/RefreshToken', {
      jwtToken,
      refreshToken,
    });

    if (response.status === 200) {
      TokenService.save(response.data.tokens);
      UserService.save(response.data.user);
      signIn(response.data.user);
    }

    return response;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 401
    ) {
      TokenService.destroy();
      UserService.destroy();
      signOut();
    }
  }
};

const retryRequestWithNewToken = async (config: InternalAxiosRequestConfig) => {
  const newToken = TokenService.get()?.jwtToken;
  if (newToken) {
    config.headers.Authorization = `Bearer ${newToken}`;
    return axios(config);
  }
};

export const refreshTokensInterceptor = async (error: AxiosError) => {
  if (
    error.config &&
    error.response &&
    error.response.status === 401 &&
    !isResponseRefresh(error.config.url)
  ) {
    const response = await refreshTokens();
    if (response && response.status === 200) {
      return retryRequestWithNewToken(error.config);
    }
  }

  return Promise.reject(error);
};
