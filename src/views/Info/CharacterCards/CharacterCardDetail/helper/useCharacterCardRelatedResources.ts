import type { Ref } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { asyncComputed } from '@vueuse/core';
import type { CharacterCard } from '@/types/HWPL/CharacterCard';
import type { Resource } from '@/components/base/ResourceTabs/Resource';
import {
  dynamicSceneCardResourceOption,
  videoResourceOption,
} from '@/components/base/ResourceTabs/Resource';
import { getSceneCardImageUrls } from '@/utils/hwpl/SceneCard/url';
import { getMusicPartMVUrl } from '@/utils/hwpl/MusicPart/url';

export async function appendSceneCardToResources(
  resources: Resource[],
  Id: number,
  cardName: string,
  dynamicCardName: string,
) {
  const sceneCardUrl = await getSceneCardImageUrls(Id);
  const to: RouteLocationRaw = {
    name: 'Scene Card Detail',
    params: { id: Id },
  };
  if (sceneCardUrl.dynamic !== null) {
    resources.push({
      name: dynamicCardName,
      key: `scene_card_${Id}_dynamic`,
      url: sceneCardUrl.dynamic,
      to,
      options: dynamicSceneCardResourceOption,
    });
  }
  else {
    resources.push({
      name: cardName,
      key: `scene_card_${Id}`,
      url: sceneCardUrl.static,
      to,
    });
  }
}

export function useCharacterCardRelatedResources(
  characterCard: Ref<CharacterCard | null>,
): Ref<Resource[]> {
  const { t } = useI18n();

  return asyncComputed<Resource[]>(async () => {
    if (characterCard.value === null)
      return [];

    const { FirstSceneCardId, RankUpSceneCardId, MusicPartId }
      = characterCard.value;
    const resources: Resource[] = [];

    if (FirstSceneCardId !== null) {
      await appendSceneCardToResources(
        resources,
        FirstSceneCardId,
        t('character_card.scene_card'),
        t('character_card.scene_card_dynamic'),
      );
    }

    if (RankUpSceneCardId !== null) {
      await appendSceneCardToResources(
        resources,
        RankUpSceneCardId,
        t('character_card.scene_card_evolved'),
        t('character_card.scene_card_evolved_dynamic'),
      );
    }

    if (MusicPartId !== null) {
      resources.push({
        name: t('character_card.mv'),
        key: 'mv',
        url: getMusicPartMVUrl(MusicPartId).default,
        to: {
          name: 'Music Part Detail',
          params: { id: MusicPartId },
        },
        options: videoResourceOption,
      });
    }

    return resources;
  }, []);
}
