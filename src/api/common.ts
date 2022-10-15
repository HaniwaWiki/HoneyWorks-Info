import { CollectionTypeName } from '@/types/HWPL';
import {
  getItemSource,
  getItemSourceAggregateInformation,
} from '@/api/itemSource';
import axios from '../utils/request';

// fetch data collection from backend, with optional filter
export async function getCollection<Name extends keyof CollectionTypeName>(
  collectionName: Name,
  filter?: Partial<CollectionTypeName[Name]>,
  version: string | number = 'latest'
): Promise<CollectionTypeName[Name][]> {
  const response = await axios.get(`/${version}/${collectionName}.json`);
  const collection = response.data as CollectionTypeName[Name][];
  if (filter) {
    return collection.filter((c) =>
      Object.keys(filter).every((k) => filter[k] === c[k])
    );
  }
  return collection;
}
