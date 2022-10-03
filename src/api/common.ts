import { APITypeName } from '../types/HWPL';
import axios from '../utils/request';

// fetch data collection from backend, with optional filter
export async function getCollection<Name extends keyof APITypeName>(
  collectionName: Name,
  filter?: Partial<APITypeName[Name]>,
  version: string | number = 'latest'
): Promise<APITypeName[Name][]> {
  const response = await axios.get(`/api/${version}/${collectionName}.json`);
  const collection = response.data as APITypeName[Name][];
  if (filter) {
    return collection.filter((c) => Object.keys(filter).every((k) => filter[k] === c[k]));
  }
  return collection;
}
