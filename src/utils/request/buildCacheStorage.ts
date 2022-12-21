import type { AxiosStorage, StorageValue } from 'axios-cache-interceptor';
import { buildStorage, canStale, isExpired } from 'axios-cache-interceptor';
import type { AsyncStorage } from '@/utils/storage/types';

// this function implement the same logic as the original buildCacheStorage function
// see: https://github.com/arthurfiorette/axios-cache-interceptor/blob/main/src/storage/web-api.ts
export function buildCacheStorage(storage: AsyncStorage, prefix = ''): AxiosStorage {
  return buildStorage({
    find: async (key) => {
      const json = await storage.getItem(prefix + key);
      return json ? (JSON.parse(json) as StorageValue) : undefined;
    },

    remove: key => storage.removeItem(prefix + key),

    set: async (key, value) => {
      const save = () => storage.setItem(prefix + key, JSON.stringify(value));

      try {
        return save();
      }
      catch (error) {
        const allValues: [string, StorageValue][] = (await storage.keys())
          .filter(item => item[0].startsWith(prefix))
          .map(item => [item[0], JSON.parse(item[1]) as StorageValue]);

        // Remove all expired values
        for (const value of allValues) {
          if (value[1].state === 'cached' && isExpired(value[1]) && !canStale(value[1]))
            storage.removeItem(value[0]);
        }

        // Try save again after removing expired values
        try {
          return save();
        }
        catch {
          // Storage still full, try removing the oldest value until it can be saved

          // Descending sort by createdAt
          const sortedItems = allValues.sort(
            (a, b) => (a[1].createdAt || 0) - (b[1].createdAt || 0),
          );

          for (const item of sortedItems) {
            storage.removeItem(item[0]);

            try {
              return save();
            }
            catch {
              // This key didn't free all the required space
            }
          }
        }

        // Clear the cache for the specified key
        await storage.removeItem(prefix + key);
      }
    },
  });
}
