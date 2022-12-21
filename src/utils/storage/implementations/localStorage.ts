import type { AsyncStorage } from '@/utils/storage/types';

export const asyncLocalStorage: AsyncStorage = {
  getItem: async (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: async (key: string, value: string) => localStorage.setItem(key, value),
  removeItem: async (key: string) => localStorage.removeItem(key),
  keys: async () => Object.keys(localStorage),
  clear: async () => localStorage.clear(),
};
