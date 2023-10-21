import type { RouteLocationRaw } from 'vue-router';
import type { Ref } from 'vue';
import { computed } from 'vue';
import { useCollection } from '@/composables/useCollection';
import type { NearbyPage } from '@/components/app/AppScaffold/types';
import type { SceneCard } from '@/types/HWPL/SceneCard';

function getTitleAndLink(
  card?: SceneCard,
): [string | undefined, RouteLocationRaw | undefined] {
  return card
    ? [card?.Name, { name: 'Scene Card Detail', params: { id: card?.ItemId } }]
    : [undefined, undefined];
}

export function useNearbyPage(id: Ref<number>): Ref<NearbyPage> {
  const { collection: cards } = useCollection('SceneCards');
  return computed(() => {
    const index = cards.value.findIndex(card => card.ItemId === id.value);
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
