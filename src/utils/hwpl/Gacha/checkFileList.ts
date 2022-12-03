import type { FileTree } from '@/types/HWPL/extra/FileTree';
import { getFileTree } from '@/api/getFileTree';

let gachaFileRoot: FileTree | undefined;

async function getGachaFileRoot(): Promise<FileTree> {
  if (gachaFileRoot !== undefined)
    return gachaFileRoot;

  gachaFileRoot = await getFileTree('gacha');
  return gachaFileRoot;
}

// get image list of a gacha
export async function getGachaImageList(Id: number): Promise<string[]> {
  const gachaFileRoot = await getGachaFileRoot();
  if (!gachaFileRoot.isDir)
    throw new Error('Gacha dir is empty');

  const gachaFileTree = gachaFileRoot.files[Id.toString()];
  if (!gachaFileTree?.isDir)
    throw new Error(`Gacha/${Id} dir is empty`);

  return Object.keys(gachaFileTree.files);
}
