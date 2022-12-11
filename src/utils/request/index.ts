import axios from 'axios';

import { buildWebStorage, setupCache } from 'axios-cache-interceptor';
import { REQUEST_CACHE_PREFIX } from '@/utils/localStorage/common';

const axiosInstance = setupCache(axios, {
  storage: buildWebStorage(localStorage, REQUEST_CACHE_PREFIX),
});

export default axiosInstance;
