import { CollectionTypeName } from '@/types/HWPL';
import { getBaseUrls } from '@/config';
import axios from '../utils/request';

// fetch data collection from backend, with optional filter
export async function getCollection<Name extends keyof CollectionTypeName>(
  collectionName: Name,
  filter?: Partial<CollectionTypeName[Name]>,
  version: string | number = 'latest'
): Promise<CollectionTypeName[Name][]> {
  const { staticApiBaseUrl } = getBaseUrls();
  const url = `${staticApiBaseUrl}/${version}/${collectionName}.json`;
  const response = await axios.get(url);
  const collection = response.data as CollectionTypeName[Name][];
  if (filter) {
    return collection.filter((c) =>
      Object.keys(filter).every((k) => filter[k] === c[k])
    );
  }
  return collection;
}
