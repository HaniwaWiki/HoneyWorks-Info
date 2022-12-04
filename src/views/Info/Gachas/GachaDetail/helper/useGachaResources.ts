import type { Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Resource } from '@/components/base/ResourceTabs/Resource';
import type { GachaBoxInfo } from '@/composables/hwpl/useGachaBoxInfoList';
import asyncComputed from '@/utils/asyncComputed';
import { getGachaImageUrls } from '@/utils/hwpl/Gacha/url';
import {
  appendSceneCardToResources,
} from '@/views/Info/CharacterCards/CharacterCardDetail/helper/useCharacterCardRelatedResources';
import { getCollection } from '@/api/common';

export function useGachaResources(
  gachaBoxInfo: Ref<GachaBoxInfo | null>,
): Ref<Resource[]> {
  const { t } = useI18n();

  return asyncComputed(async () => {
    if (!gachaBoxInfo.value)
      return [];

    const gachaId = gachaBoxInfo.value.Id;
    const gachaImageUrls = await getGachaImageUrls(gachaId);
    const resources: Resource[] = [];
    if (gachaImageUrls.logo) {
      resources.push({
        name: t('gacha.logo'),
        key: 'logo',
        url: gachaImageUrls.logo,
      });
    }
    resources.push({
      name: t('gacha.banner'),
      key: 'banner',
      url: gachaImageUrls.banner,
    });
    if (gachaImageUrls.background) {
      resources.push({
        name: t('gacha.background'),
        key: 'background',
        url: gachaImageUrls.background,
      });
    }

    for (const characterCard of gachaBoxInfo.value.CharacterCards) {
      // if rank up scene card exists, append to resources
      if (characterCard.RankUpSceneCardId !== null) {
        await appendSceneCardToResources(
          resources,
          characterCard.RankUpSceneCardId,
          t('character_card.scene_card_evolved'),
          t('character_card.scene_card_evolved_dynamic'),
        );
        // if background of scene card also exists, append to resources
        const sceneCard = (await getCollection('SceneCards', {
          ItemId: characterCard.RankUpSceneCardId,
        }))[0];
        const backgroundOfSceneCard = gachaImageUrls.backgroundWithCard.find(
          url => url.includes(sceneCard.ImageIdentifier),
        );
        if (backgroundOfSceneCard) {
          resources.push({
            name: t('gacha.background'),
            key: `background_${characterCard.Id}`,
            url: backgroundOfSceneCard,
          });
        }
      }
    }

    return resources;
  }, []);
}
