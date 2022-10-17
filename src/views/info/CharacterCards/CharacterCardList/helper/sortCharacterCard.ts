import { CharacterCard } from '@/types/HWPL/CharacterCard';
import { computed, Ref, unref } from 'vue';
import { MaybeRef } from '@/types/vue/ref';
import asyncComputed from '@/utils/asyncComputed';
import { getItemSourceAggregateInformation } from '@/api/itemSource';
import { useSort } from '@/composables/useSort';

export type SortBy = 'Default' | 'Ability' | 'ReleaseTimestamp';

const itemSources = asyncComputed(getItemSourceAggregateInformation, []);

const sortKeyMap = {
  Default: (card: CharacterCard) => card.Id,
  Ability: (card: CharacterCard) =>
    -(card.MaxTapRank2 + card.MaxTechRank2 + card.MaxKyunKyunRank2),
  ReleaseTimestamp: (card: CharacterCard) =>
    -(
      itemSources.value.find((itemSource) => itemSource.ItemId === card.Id)
        ?.ReleaseTimestamp || 0
    ),
} as const;

export function useSortCharacterCards(
  characterCards: MaybeRef<CharacterCard[]>,
  sortBy: MaybeRef<SortBy>
): Ref<CharacterCard[]> {
  const sortFunction = computed(() => sortKeyMap[unref(sortBy)]);
  return useSort(characterCards, sortFunction);
}
