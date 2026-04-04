import { BASE_URI } from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: BASE_URI,
  timeout: 10000,
});

api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      if (error.config.__isRetryRequest) {
        return Promise.reject(error);
      }
      error.config.__isRetryRequest = true;
      try {
        // navigation.navigate("Role")
        // // Get refresh token
        // const refreshToken = await AsyncStorage.getItem('refreshToken');
        // // Call refresh API
        // const res = await axios.post(`${Config.API_URL}/auth/refresh-token`, {
        //   refreshToken: refreshToken,
        // });
        // const newAccessToken = res?.data?.data?.[0]?.accessToken;
        // // Save new token
        // await AsyncStorage.setItem('accessToken', newAccessToken);
        // // Retry the original request
        // error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        // return api(error.config);
      } catch (err) {
        // Refresh also failed → logout
        await AsyncStorage.clear();
        // window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
