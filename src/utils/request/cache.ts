import _ from 'lodash';
import { REQUEST_CACHE_PREFIX } from '@/utils/localStorage/common';

const REQUEST_CACHE_CONTENT_PREFIX = `${REQUEST_CACHE_PREFIX}content/`;

export function getRequestCache(url: string): string | null {
  const cacheKey = `${REQUEST_CACHE_CONTENT_PREFIX}${url}`;
  return localStorage.getItem(cacheKey);
}

export function setRequestCache(url: string, content: string) {
  const cacheKey = `${REQUEST_CACHE_CONTENT_PREFIX}${url}`;
  localStorage.setItem(cacheKey, content);
}

export function queryRequestCacheSize() {
  const sizes = Object.keys(localStorage)
    .filter(key => key.startsWith(REQUEST_CACHE_PREFIX))
    .map(key => localStorage.getItem(key)?.length || 0);
  return _.sum(sizes);
}

export function clearRequestCache() {
  Object.keys(localStorage)
    .filter(key => key.startsWith(REQUEST_CACHE_PREFIX))
    .forEach(key => localStorage.removeItem(key));
}

// TODO: automatically clear cache if version is updated
