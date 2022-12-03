import _ from 'lodash';
import type { Ref } from 'vue';
import { computed } from 'vue';
import { useCollection } from '@/composables/useCollection';
import type { GachaBox } from '@/types/HWPL/GachaBox';
import type { CharacterCard } from '@/types/HWPL/CharacterCard';
import type { Term } from '@/types/HWPL/Term';

export type GachaBoxInfo = GachaBox & {
  CharacterCards: CharacterCard[];
  Term: Term;
};

export function useGachaBoxInfoList() {
  const { loading: loadingGachaBoxes, collection: gachaBoxes } = useCollection('GachaBoxes');
  const { loading: loadingCharacterCards, collection: characterCards } = useCollection('CharacterCards');
  const { loading: loadingTerms, collection: terms } = useCollection('Terms');

  const characterCardMap = computed(() => _.keyBy(characterCards.value, 'Id'));
  const termMap = computed(() => _.keyBy(terms.value, 'Id'));

  const loading = computed(() => loadingGachaBoxes.value || loadingCharacterCards.value || loadingTerms.value);
  const gachaBoxInfoList: Ref<GachaBoxInfo[]> = computed(() => loading.value
    ? []
    : gachaBoxes.value.map(gachaBox => ({
      ...gachaBox,
      CharacterCards: [
        gachaBox.PickUpItem1Id,
        gachaBox.PickUpItem2Id,
        gachaBox.PickUpItem3Id,
      ]
        .filter(id => id)
        .map(id => characterCardMap.value[id as number]),
      Term: termMap.value[gachaBox.TermId],
    })));

  return { loading, gachaBoxInfoList };
}
