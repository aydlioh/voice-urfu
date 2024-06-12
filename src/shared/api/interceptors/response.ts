import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { TokenService, UserService } from '../services';
import { authHttp } from '../instance';
import { isResponseRefresh } from '../utils';

const refreshTokens = async () => {
  const tokens = TokenService.get();

  if (!tokens) return;

  const { jwtToken, refreshToken } = tokens;

  if (!jwtToken || !refreshToken) return;

  const response = await authHttp.post('/RefreshToken', {
    jwtToken,
    refreshToken,
  });

  if (response.status === 401) {
    TokenService.destroy();
    UserService.destroy();
  }

  if (response.status === 200) {
    TokenService.save(response.data.tokens);
    UserService.save(response.data.user);
  }

  return response;
};

const retryRequestWithNewToken = async (
  config: InternalAxiosRequestConfig
) => {
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
    (error.response.status === 500 || error.response.status === 400) && // TODO 401
    !isResponseRefresh(error.config.url)
  ) {
    const response = await refreshTokens();
    if (response && response.status === 200) {
      return retryRequestWithNewToken(error.config);
    }
  }

  return Promise.reject(error);
};
