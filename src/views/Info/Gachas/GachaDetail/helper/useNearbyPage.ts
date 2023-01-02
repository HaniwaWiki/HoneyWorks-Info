import type { RouteLocationRaw } from 'vue-router';
import type { ComputedRef, Ref } from 'vue';
import { computed } from 'vue';
import { useCollection } from '@/composables/useCollection';
import type { NearbyPage } from '@/components/app/AppScaffold/types';
import type { GachaBox } from '@/types/HWPL/GachaBox';

function getTitleAndLink(gachaBox?: GachaBox): [string | undefined, RouteLocationRaw | undefined] {
  return gachaBox
    ? [gachaBox.Name, { name: 'Gacha Detail', params: { id: gachaBox.Id } }]
    : [undefined, undefined];
}

export function useNearbyPage(id: Ref<number>): ComputedRef<NearbyPage> {
  const { collection: gachaBoxes } = useCollection('GachaBoxes');
  return computed(() => {
    const index = gachaBoxes.value.findIndex(gachaBox => gachaBox.Id === id.value);
    const [prevTitle, prevTo] = getTitleAndLink(gachaBoxes.value[index - 1]);
    const [nextTitle, nextTo] = getTitleAndLink(gachaBoxes.value[index + 1]);
    return {
      prevTitle,
      prevTo,
      nextTitle,
      nextTo,
    };
  });
}
