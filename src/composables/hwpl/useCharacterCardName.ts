// composable version of parseCharacterCardName
import { computed, Ref } from 'vue';
import { CharacterCard } from '@/types/HWPL/CharacterCard';
import { parseCharacterCardName } from '@/utils/hwpl/CharacterCard/common';

export function useCharacterCardName(
  characterCard: Ref<CharacterCard | undefined | null>
): [Ref<string>, Ref<string>] {
  return [
    computed(() => parseCharacterCardName(characterCard.value)[0]),
    computed(() => parseCharacterCardName(characterCard.value)[1]),
  ];
}
