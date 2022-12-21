import type { Ref } from 'vue';
import { computed, unref } from 'vue';
import type { MaybeRef } from '@/types/vue/ref';
import { useSort } from '@/composables/useSort';
import type { MusicInfo } from '@/composables/hwpl/useMusicInfoList';

export type MusicInfoSortBy = 'Id' | 'UpdatedAt';
const sortKeyMap = {
  UpdatedAt: (musicInfo: MusicInfo) => (-musicInfo.VersionId),
  Id: (musicInfo: MusicInfo) => musicInfo.Id,
} as const;

export function useSortMusicInfoList(
  musicInfoList: MaybeRef<MusicInfo[]>,
  sortBy: MaybeRef<MusicInfoSortBy>,
): Ref<MusicInfo[]> {
  const sortFunction = computed(() => sortKeyMap[unref(sortBy)]);
  return useSort(musicInfoList, sortFunction);
}
