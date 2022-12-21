import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import { REQUEST_CACHE_PREFIX } from '@/utils/storage/prefixes';
import { buildCacheStorage } from '@/utils/request/buildCacheStorage';
import { storage } from '@/utils/storage';

const axiosInstance = setupCache(axios, {
  storage: buildCacheStorage(storage, REQUEST_CACHE_PREFIX),
});

export default axiosInstance;
