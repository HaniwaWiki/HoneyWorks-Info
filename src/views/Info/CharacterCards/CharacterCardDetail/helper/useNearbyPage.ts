import type { RouteLocationRaw } from 'vue-router';
import type { ComputedRef, Ref } from 'vue';
import { computed } from 'vue';
import { useCollection } from '@/composables/useCollection';
import type { NearbyPage } from '@/components/app/AppScaffold/types';
import type { CharacterCard } from '@/types/HWPL/CharacterCard';

function getTitleAndLink(card?: CharacterCard): [string | undefined, RouteLocationRaw | undefined] {
  return card
    ? [card.Name, { name: 'Character Card Detail', params: { id: card.Id } }]
    : [undefined, undefined];
}

export function useNearbyPage(id: Ref<number>): ComputedRef<NearbyPage> {
  const { collection: cards } = useCollection('CharacterCards');
  return computed(() => {
    const index = cards.value.findIndex(card => card.Id === id.value);
    const [prevTitle, prevTo] = getTitleAndLink(cards.value[index - 1]);
    const [nextTitle, nextTo] = getTitleAndLink(cards.value[index + 1]);
    return {
      prevTitle,
      prevTo,
      nextTitle,
      nextTo,
    };
  });
}
