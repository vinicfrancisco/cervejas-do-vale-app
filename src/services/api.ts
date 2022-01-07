import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { reset } from '~/navigation/RootNavigation';
import { USER_TOKEN } from '~/util/consts';

const host = Platform.select({
  android: '192.168.1.9',
  ios: 'localhost',
});

const localUrl = `http://${host}:3333`;

export const apiUrl = 'https://cervejas-do-vale.herokuapp.com';

const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const token = await AsyncStorage.getItem(USER_TOKEN);

  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return Promise.resolve(response);
  },
  async (error: AxiosError) => {
    if (error?.response?.status === 401) {
      await AsyncStorage.multiRemove([USER_TOKEN]);

      reset('Auth');
    }

    return Promise.reject(error);
  },
);

export default api;
