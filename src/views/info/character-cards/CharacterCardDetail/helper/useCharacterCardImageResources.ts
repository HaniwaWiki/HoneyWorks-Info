import { CharacterCard } from '@/types/HWPL/CharacterCard';
import { Resource } from '@/components/base/ResourceTabs/types';
import { ref, Ref, watchEffect } from 'vue';
import { getSceneCardStaticImageUrl } from '@/utils/hwpl/SceneCard/url';
import { getMusicPartMVUrl } from '@/utils/hwpl/MusicPart/url';

export function useCharacterCardImageResources(
  characterCard: Ref<CharacterCard | null>
): Ref<Resource[]> {
  watchEffect(async () => {
    const { FirstSceneCardId, RankUpSceneCardId, MusicPartId } =
      characterCard.value || {};
    return [
      FirstSceneCardId && getSceneCardStaticImageUrl(FirstSceneCardId),
      RankUpSceneCardId && getSceneCardStaticImageUrl(RankUpSceneCardId),
      MusicPartId && getMusicPartMVUrl(MusicPartId),
    ]
      .filter((url) => url)
      .map((url) => ({ name: url, url }));
  });
  return ref([]);
}
