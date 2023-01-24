import type { RouteLocationRaw } from 'vue-router';
import type { Ref } from 'vue';
import { computed } from 'vue';
import { useCollection } from '@/composables/useCollection';
import type { NearbyPage } from '@/components/app/AppScaffold/types';
import type { Album } from '@/types/HWPL/Album';

function getTitleAndLink(
  card?: Album,
): [string | undefined, RouteLocationRaw | undefined] {
  return card
    ? [card?.Name, { name: 'Album Detail', params: { id: card?.Id } }]
    : [undefined, undefined];
}

export function useNearbyPage(id: Ref<number>): Ref<NearbyPage> {
  const { collection: cards } = useCollection('Albums');
  return computed(() => {
    const index = cards.value.findIndex(card => card?.Id === id.value);
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
