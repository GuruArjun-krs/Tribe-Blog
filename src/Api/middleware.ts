import { BASE_URI } from '@env';
import axios from 'axios';

const api = axios.create({
  baseURL: BASE_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
