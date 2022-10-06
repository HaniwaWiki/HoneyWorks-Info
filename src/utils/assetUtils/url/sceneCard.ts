import { getCollection } from '../../../api/common';
import { assetBaseUrl } from '../../../config';

function getSceneCardStaticImageUrl(Id: number) {
  return `${assetBaseUrl}/assets/Assets/SceneCards/${Id}.png`;
}

function getSceneCardDynamicImageUrl(Id: number) {
  return `${assetBaseUrl}/assets/CriwareCpks/SceneCard/${Id}/${Id}.cpk_unpacked/${Id}.usm.m2v`;
}

// 5-Rarity Character Cards have dynamic Scene Card images when cards are rank up
let sceneCardWithDynamicImageIds: Set<number> | null = null;
async function getSceneCardWithDynamicImageIds(): Promise<Set<number>> {
  if (sceneCardWithDynamicImageIds !== null) {
    return sceneCardWithDynamicImageIds;
  }
  sceneCardWithDynamicImageIds = new Set<number>([1, 2, 3]);
  const characterCards = await getCollection('CharacterCards', { Rarity: 5 });
  const sceneCardIds = characterCards.map((c) => c.RankUpSceneCardId);
  sceneCardWithDynamicImageIds = new Set<number>(sceneCardIds);
  return sceneCardWithDynamicImageIds;
}

export async function getSceneCardImageUrl(Id: number) {
  const hasDynamicImage = (await getSceneCardWithDynamicImageIds()).has(Id);
  return {
    static: getSceneCardStaticImageUrl(Id),
    dynamic: hasDynamicImage ? getSceneCardDynamicImageUrl(Id) : null,
  };
}
