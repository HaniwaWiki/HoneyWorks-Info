// composable of getFileTree
import { ref, watchEffect } from 'vue';
import type { AvailableFileTreeName } from '@/api/getFileTree';
import { getFileTree } from '@/api/getFileTree';
import type { FileTree } from '@/types/HWPL/extra/FileTree';

export function useFileTree(
  name: AvailableFileTreeName,
) {
  const fileTree = ref<FileTree>({ isDir: true, files: {} });
  const loading = ref(true);

  // use a watch function to fetch data from backend
  watchEffect(() =>
    getFileTree(name).then(
      (data) => {
        fileTree.value = data;
        loading.value = false;
      },
    ),
  );

  return { fileTree, loading };
}
