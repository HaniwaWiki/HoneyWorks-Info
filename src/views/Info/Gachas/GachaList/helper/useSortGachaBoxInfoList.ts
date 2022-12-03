import type { Ref } from 'vue';
import { computed, unref } from 'vue';
import type { MaybeRef } from '@/types/vue/ref';
import { useSort } from '@/composables/useSort';
import type { GachaBoxInfo } from '@/composables/hwpl/useGachaBoxInfoList';

export type GachaInfoSortBy = 'Id' | 'StartAt';
const sortKeyMap = {
  StartAt: (card: GachaBoxInfo) => (-card.Term.StartAt),
  Id: (card: GachaBoxInfo) => card.Id,
} as const;

export function useSortGachaBoxInfoList(
  gachaBoxInfoList: MaybeRef<GachaBoxInfo[]>,
  sortBy: MaybeRef<GachaInfoSortBy>,
): Ref<GachaBoxInfo[]> {
  const sortFunction = computed(() => sortKeyMap[unref(sortBy)]);
  return useSort(gachaBoxInfoList, sortFunction);
}
