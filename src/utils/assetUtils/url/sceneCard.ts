import { getCollection } from '@/api/common';
import { assetBaseUrl } from '@/config';

// generate static image url
function getSceneCardStaticImageUrl(Id: number) {
  return `${assetBaseUrl}/assets/Assets/SceneCards/${Id}.png`;
}

// generate static thumb image url
function getSceneCardStaticThumbImageUrl(Id: number) {
  return `${assetBaseUrl}/assets/Assets/SceneCards_thumb/${Id}_thumb.png`;
}

// generate dynamic image url
function getSceneCardDynamicImageUrl(Id: number) {
  return `${assetBaseUrl}/assets/CriwareCpks/SceneCard/${Id}/${Id}.mp4`;
}

// only 5-Rarity Character Cards have dynamic Scene Card images when cards are rank up
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

async function hasDynamicImage(Id: number): Promise<boolean> {
  return (await getSceneCardWithDynamicImageIds()).has(Id);
}

export async function getSceneCardImageUrl(Id: number) {
  return {
    static: getSceneCardStaticImageUrl(Id),
    static_thumb: getSceneCardStaticThumbImageUrl(Id),
    dynamic: (await hasDynamicImage(Id))
      ? getSceneCardDynamicImageUrl(Id)
      : null,
  };
}
