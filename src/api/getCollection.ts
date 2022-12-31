import axios from '../utils/request';
import type { CollectionTypeName } from '@/types/HWPL';
import { getBaseUrls } from '@/api/baseUrls';

// fetch data collection from backend, with optional filter
export async function getCollection<Name extends keyof CollectionTypeName>(
  collectionName: Name,
  filter?: Partial<CollectionTypeName[Name]>,
  version: string | number = 'latest',
): Promise<CollectionTypeName[Name][]> {
  const { staticApiBaseUrl } = getBaseUrls();
  const url = `${staticApiBaseUrl}/${version}/${collectionName}.json`;
  const response = await axios.get(url);
  const collection = response.data as CollectionTypeName[Name][];
  if (filter) {
    return collection.filter(c =>
      Object.keys(filter).every(k => filter[k] === c[k]),
    );
  }
  return collection;
}

// `getCollectionsConcurrently` is for us to fetch multiple collections concurrently
// we define multiple signatures of this function,
// so that we will get exact result whose types are match with the arguments users pass in
export async function getCollectionsConcurrently<
  Name1 extends keyof CollectionTypeName,
>(
  names: [Name1],
  version: string | number
): Promise<[CollectionTypeName[Name1][]]>;
export async function getCollectionsConcurrently<
  Name1 extends keyof CollectionTypeName,
  Name2 extends keyof CollectionTypeName,
>(
  names: [Name1, Name2],
  version: string | number
): Promise<[CollectionTypeName[Name1][], CollectionTypeName[Name2][]]>;
export async function getCollectionsConcurrently<
  Name1 extends keyof CollectionTypeName,
  Name2 extends keyof CollectionTypeName,
  Name3 extends keyof CollectionTypeName,
>(
  names: [Name1, Name2, Name3],
  version: string | number
): Promise<
  [
    CollectionTypeName[Name1][],
    CollectionTypeName[Name2][],
    CollectionTypeName[Name3][],
  ]
>;
export async function getCollectionsConcurrently<
  Name1 extends keyof CollectionTypeName,
  Name2 extends keyof CollectionTypeName,
  Name3 extends keyof CollectionTypeName,
  Name4 extends keyof CollectionTypeName,
>(
  names: [Name1, Name2, Name3, Name4],
  version: string | number
): Promise<
  [
    CollectionTypeName[Name1][],
    CollectionTypeName[Name2][],
    CollectionTypeName[Name3][],
    CollectionTypeName[Name4][],
  ]
>;
export async function getCollectionsConcurrently<
  Name1 extends keyof CollectionTypeName,
  Name2 extends keyof CollectionTypeName,
  Name3 extends keyof CollectionTypeName,
  Name4 extends keyof CollectionTypeName,
  Name5 extends keyof CollectionTypeName,
>(
  names: [Name1, Name2, Name3, Name4, Name5],
  version: string | number
): Promise<
  [
    CollectionTypeName[Name1][],
    CollectionTypeName[Name2][],
    CollectionTypeName[Name3][],
    CollectionTypeName[Name4][],
    CollectionTypeName[Name5][],
  ]
>;
export async function getCollectionsConcurrently<
  Name1 extends keyof CollectionTypeName,
  Name2 extends keyof CollectionTypeName,
  Name3 extends keyof CollectionTypeName,
  Name4 extends keyof CollectionTypeName,
  Name5 extends keyof CollectionTypeName,
  Name6 extends keyof CollectionTypeName,
>(
  names: [Name1, Name2, Name3, Name4, Name5, Name6],
  version: string | number
): Promise<
  [
    CollectionTypeName[Name1][],
    CollectionTypeName[Name2][],
    CollectionTypeName[Name3][],
    CollectionTypeName[Name4][],
    CollectionTypeName[Name5][],
    CollectionTypeName[Name6][],
  ]
>;

export async function getCollectionsConcurrently(
  names: any[],
  version: string | number = 'latest',
): Promise<any[][]> {
  const promises = names.map(name => getCollection(name, {}, version));
  return Promise.all(promises);
}
