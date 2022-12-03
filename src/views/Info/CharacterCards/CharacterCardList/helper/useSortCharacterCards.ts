import type { Ref } from 'vue';
import { computed, unref } from 'vue';
import type { CharacterCard } from '@/types/HWPL/CharacterCard';
import type { MaybeRef } from '@/types/vue/ref';
import asyncComputed from '@/utils/asyncComputed';
import { getItemSourceAggregateInformation } from '@/api/itemSource';
import { useSort } from '@/composables/useSort';

export type CharacterCardSortBy = 'Default' | 'Ability' | 'ReleaseTimestamp';

const itemSources = asyncComputed(getItemSourceAggregateInformation, []);

const sortKeyMap = {
  Default: (card: CharacterCard) => card.Id,
  Ability: (card: CharacterCard) =>
    -(card.MaxTapRank2 + card.MaxTechRank2 + card.MaxKyunKyunRank2),
  ReleaseTimestamp: (card: CharacterCard) =>
    -(
      itemSources.value.find(itemSource => itemSource.ItemId === card.Id)
        ?.ReleaseTimestamp || 0
    ),
} as const;

export function useSortCharacterCards(
  characterCards: MaybeRef<CharacterCard[]>,
  sortBy: MaybeRef<CharacterCardSortBy>,
): Ref<CharacterCard[]> {
  const sortFunction = computed(() => sortKeyMap[unref(sortBy)]);
  return useSort(characterCards, sortFunction);
}
