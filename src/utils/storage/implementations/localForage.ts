import localforage from 'localforage';
import type { AsyncStorage } from '@/utils/storage/types';

export const asyncLocalforage: AsyncStorage = {
  getItem: (key: string) => localforage.getItem(key),
  setItem: async (key: string, value: string) => {
    await localforage.setItem(key, value);
  },
  removeItem: (key: string) => localforage.removeItem(key),
  keys: () => localforage.keys(),
  clear: () => localforage.clear(),
};
