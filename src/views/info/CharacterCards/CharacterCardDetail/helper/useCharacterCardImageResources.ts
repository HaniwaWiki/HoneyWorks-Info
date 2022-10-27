import { CharacterCard } from '@/types/HWPL/CharacterCard';
import { Resource } from '@/components/base/ResourceTabs/Resource';
import { computed, Ref } from 'vue';
import { getCharacterCardImageUrl } from '@/utils/hwpl/CharacterCard/url';
import { useI18n } from 'vue-i18n';

export function useCharacterCardImageResources(
  characterCard: Ref<CharacterCard | null>
): Ref<Resource[]> {
  const { t } = useI18n();

  return computed(() => {
    if (characterCard.value === null) {
      return [];
    }
    const { Id } = characterCard.value;
    return [
      {
        name: t('character_card.image'),
        url: getCharacterCardImageUrl({ Id, evolved: false, icon: false }),
      },
      {
        name: t('character_card.image_evolved'),
        url: getCharacterCardImageUrl({ Id, evolved: true, icon: false }),
      },
      {
        name: t('character_card.icon'),
        url: getCharacterCardImageUrl({ Id, evolved: false, icon: true }),
        options: {
          width: '20vh',
          height: '20vh',
        },
      },
      {
        name: t('character_card.icon_evolved'),
        url: getCharacterCardImageUrl({ Id, evolved: true, icon: true }),
        options: {
          width: '20vh',
          height: '20vh',
        },
      },
    ];
  });
}
