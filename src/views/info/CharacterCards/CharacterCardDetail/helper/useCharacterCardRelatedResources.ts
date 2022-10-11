import { CharacterCard } from '@/types/HWPL/CharacterCard';
import {
  dynamicSceneCardResourceOption,
  Resource,
  videoResourceOption,
} from '@/components/base/ResourceTabs/Resource';
import { Ref } from 'vue';
import asyncComputed from '@/utils/asyncComputed';
import { getSceneCardImageUrl } from '@/utils/hwpl/SceneCard/url';
import { getMusicPartMVUrl } from '@/utils/hwpl/MusicPart/url';
import { RouteLocationRaw } from 'vue-router';

export function useCharacterCardRelatedResources(
  characterCard: Ref<CharacterCard | null>
): Ref<Resource[]> {
  return asyncComputed<Resource[]>(async () => {
    if (characterCard.value === null) {
      return [];
    }
    const { FirstSceneCardId, RankUpSceneCardId, MusicPartId } =
      characterCard.value;
    const resources: Resource[] = [];

    async function pushSceneCardResources(
      Id: number,
      cardName: string,
      dynamicCardName: string
    ) {
      const sceneCardUrl = await getSceneCardImageUrl(Id);
      const to: RouteLocationRaw = {
        name: 'Scene Card Detail',
        params: { id: Id },
      };
      if (sceneCardUrl.dynamic !== null) {
        resources.push({
          name: dynamicCardName,
          url: sceneCardUrl.dynamic,
          to,
          options: dynamicSceneCardResourceOption,
        });
      } else {
        resources.push({
          name: cardName,
          url: sceneCardUrl.static,
          to,
        });
      }
    }

    if (FirstSceneCardId !== null) {
      await pushSceneCardResources(
        FirstSceneCardId,
        'Scene Card',
        'Scene Card (Dynamic)'
      );
    }

    if (RankUpSceneCardId !== null) {
      await pushSceneCardResources(
        RankUpSceneCardId,
        'Scene Card (Evolved)',
        'Scene Card (Evolved, Dynamic)'
      );
    }

    if (MusicPartId !== null) {
      resources.push({
        name: 'MV',
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
