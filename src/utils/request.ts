import axios from 'axios';
import { apiBaseUrl } from '../config';

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

export default axiosInstance;
