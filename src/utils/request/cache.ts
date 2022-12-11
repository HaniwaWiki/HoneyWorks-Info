import _ from 'lodash';
import { REQUEST_CACHE_PREFIX } from '@/utils/storage/prefixes';
import { storage } from '@/utils/storage';

export async function queryRequestCacheSize() {
  const keys = await storage.keys();
  const itemsPromises = keys
    .filter(key => key.startsWith(REQUEST_CACHE_PREFIX))
    .map(key => storage.getItem(key));
  const contents = await Promise.all(itemsPromises);
  return _.sum(contents.map(content => content?.length || 0));
}

export async function clearRequestCache() {
  const keys = await storage.keys();
  const clearPromises = keys.filter(key => key.startsWith(REQUEST_CACHE_PREFIX))
    .map(key => storage.removeItem(key));
  await Promise.all(clearPromises);
}
