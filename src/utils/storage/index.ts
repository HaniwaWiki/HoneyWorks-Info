import type { AsyncStorage, StorageVariableFactory } from '@/utils/storage/types';
import { asyncLocalforage } from '@/utils/storage/implementations/localForage';

/*
  This app use interface AsyncStorage to build web app,
  so that the storage implementation can be changed easily.

  Currently, we have implementation of:
  1. localStorage
  2. localforage (based on IndexedDB, WebSQL or localStorage)
 */
export const storage: AsyncStorage = asyncLocalforage;

// @ts-expect-error this is to expose storage to user
window.storage = storage;

export const createStorageVariable: StorageVariableFactory = (key, defaultValue) => {
  const getValue = async () => {
    const value = await storage.getItem(key);
    return value === null ? defaultValue : JSON.parse(value);
  };
  const setValue = (value: unknown) => storage.setItem(key, JSON.stringify(value));

  return [getValue, setValue];
};
