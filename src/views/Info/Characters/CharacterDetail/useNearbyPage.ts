import type { RouteLocationRaw } from 'vue-router';
import type { ComputedRef, Ref } from 'vue';
import { computed } from 'vue';
import { useCollection } from '@/composables/useCollection';
import type { Character } from '@/types/HWPL/Character';
import type { NearbyPage } from '@/components/app/AppScaffold/types';

function getTitleAndLink(character?: Character): [string | undefined, RouteLocationRaw | undefined] {
  return character
    ? [character.Name, { name: 'Character Detail', params: { id: character.Id } }]
    : [undefined, undefined];
}

export function useNearbyPage(id: Ref<number>): ComputedRef<NearbyPage> {
  const { collection: characters } = useCollection('Characters');
  return computed(() => {
    const index = characters.value.findIndex(character => character.Id === id.value);
    const [prevTitle, prevTo] = getTitleAndLink(characters.value[index - 1]);
    const [nextTitle, nextTo] = getTitleAndLink(characters.value[index + 1]);
    return {
      prevTitle,
      prevTo,
      nextTitle,
      nextTo,
    };
  });
}
