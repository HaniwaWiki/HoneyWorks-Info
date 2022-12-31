import axios from '../utils/request';
import type { CollectionTypeName } from '@/types/HWPL';
import { getBaseUrls } from '@/api/baseUrls';

// fetch data collection from backend, with optional filter
export async function getCollection<
  Name extends keyof CollectionTypeName,
  Collection extends CollectionTypeName[Name],
>(
  collectionName: Name,
  filter?: Partial<Collection>,
  version: string | number = 'latest',
): Promise<Collection[]> {
  const { staticApiBaseUrl } = getBaseUrls();
  const url = `${staticApiBaseUrl}/${version}/${collectionName}.json`;
  const response = await axios.get(url);
  const collection = response.data as Collection[];
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
  Name2 extends keyof CollectionTypeName,
>(
  names: [Name1, Name2],
  version: string | number
): Promise<[CollectionTypeName[Name1][], CollectionTypeName[Name2][]]>;

export async function getCollectionsConcurrently(
  names: any[],
  version: string | number = 'latest',
): Promise<any[][]> {
  const promises = names.map(name => getCollection(name, {}, version));
  return Promise.all(promises);
}
