import { CharacterCard } from '@/types/HWPL/CharacterCard';
import { Resource } from '@/components/base/ResourceTabs/Resource';
import { computed, Ref } from 'vue';
import { getCharacterCardImageUrl } from '@/utils/hwpl/CharacterCard/url';

export function useCharacterCardImageResources(
  characterCard: Ref<CharacterCard | null>
): Ref<Resource[]> {
  return computed(() => {
    if (characterCard.value === null) {
      return [];
    }
    const { Id } = characterCard.value;
    return [
      {
        name: 'Image',
        url: getCharacterCardImageUrl({ Id, evolved: false, icon: false }),
      },
      {
        name: 'Image (Evolved)',
        url: getCharacterCardImageUrl({ Id, evolved: true, icon: false }),
      },
      {
        name: 'Icon',
        url: getCharacterCardImageUrl({ Id, evolved: false, icon: true }),
      },
      {
        name: 'Icon (Evolved)',
        url: getCharacterCardImageUrl({ Id, evolved: true, icon: true }),
      },
    ];
  });
}
