import axios from '../utils/request';
import { getBaseUrls } from '@/api/baseUrls';
import type { CollectionTypeName } from '@/types/HWPL';

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

// type definition of getCollectionsConcurrently
export function getCollectionsConcurrently<Names extends (keyof CollectionTypeName)[] | []>(
  names: Names,
  version?: string | number,
): Promise<{ [Index in keyof Names]: CollectionTypeName[Names[Index]][] }>;

// implementation of getCollectionsConcurrently
export async function getCollectionsConcurrently(
  names: (keyof CollectionTypeName)[],
  version: string | number = 'latest',
) {
  const promises = names.map(name => getCollection(name, {}, version));
  return Promise.all(promises);
}
