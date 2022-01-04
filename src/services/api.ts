import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { USER_TOKEN } from '~/util/consts';

const host = Platform.select({
  android: '192.168.1.9',
  ios: 'localhost',
});

const api = axios.create({
  baseURL: `http://${host}:3333`,
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

export default api;
