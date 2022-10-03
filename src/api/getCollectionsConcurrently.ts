import { APITypeName } from '../types/HWPL';
import { getCollection } from './common';

// `getCollectionsConcurrently` is for us to fetch multiple collections concurrently
// we define multiple signatures of this function,
// so that we will get exact result whose types are match with the arguments users pass in
export async function getCollectionsConcurrently<Name1 extends keyof APITypeName>(
  names: [Name1],
  version: string | number
): Promise<[APITypeName[Name1][]]>;
export async function getCollectionsConcurrently<Name1 extends keyof APITypeName, Name2 extends keyof APITypeName>(
  names: [Name1, Name2],
  version: string | number
): Promise<[APITypeName[Name1][], APITypeName[Name2][]]>;
export async function getCollectionsConcurrently<
  Name1 extends keyof APITypeName,
  Name2 extends keyof APITypeName,
  Name3 extends keyof APITypeName
>(
  names: [Name1, Name2, Name3],
  version: string | number
): Promise<[APITypeName[Name1][], APITypeName[Name2][], APITypeName[Name3][]]>;
export async function getCollectionsConcurrently<
  Name1 extends keyof APITypeName,
  Name2 extends keyof APITypeName,
  Name3 extends keyof APITypeName,
  Name4 extends keyof APITypeName
>(
  names: [Name1, Name2, Name3, Name4],
  version: string | number
): Promise<[APITypeName[Name1][], APITypeName[Name2][], APITypeName[Name3][], APITypeName[Name4][]]>;
export async function getCollectionsConcurrently<
  Name1 extends keyof APITypeName,
  Name2 extends keyof APITypeName,
  Name3 extends keyof APITypeName,
  Name4 extends keyof APITypeName,
  Name5 extends keyof APITypeName
>(
  names: [Name1, Name2, Name3, Name4, Name5],
  version: string | number
): Promise<
  [APITypeName[Name1][], APITypeName[Name2][], APITypeName[Name3][], APITypeName[Name4][], APITypeName[Name5][]]
>;
export async function getCollectionsConcurrently<
  Name1 extends keyof APITypeName,
  Name2 extends keyof APITypeName,
  Name3 extends keyof APITypeName,
  Name4 extends keyof APITypeName,
  Name5 extends keyof APITypeName,
  Name6 extends keyof APITypeName
>(
  names: [Name1, Name2, Name3, Name4, Name5, Name6],
  version: string | number
): Promise<
  [
    APITypeName[Name1][],
    APITypeName[Name2][],
    APITypeName[Name3][],
    APITypeName[Name4][],
    APITypeName[Name5][],
    APITypeName[Name6][]
  ]
>;

export async function getCollectionsConcurrently(names: any[], version: string | number = 'latest'): Promise<any[][]> {
  const promises = names.map((name) => getCollection(name, {}, version));
  return Promise.all(promises);
}
