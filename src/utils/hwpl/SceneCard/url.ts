import { getCollection } from '@/api/common';
import { assetBaseUrl } from '@/config';
import { Resource } from '@/components/base/ResourceTabs/Resource';
import { SceneCard } from '@/types/HWPL/SceneCard';

// cached scene cards list
let sceneCards: SceneCard[];
// only 5-Rarity Character Cards have dynamic Scene Card images when cards are rank up
let dynamicSceneCardIds: Set<number> | null = null;

// generate static image url
export function getSceneCardStaticImageUrl(imageId: string) {
  return `${assetBaseUrl}/Assets/SceneCards/${imageId}.png`;
}

// generate static thumb image url
export function getSceneCardStaticThumbImageUrl(imageId: string) {
  return `${assetBaseUrl}/Assets/SceneCards_thumb/${imageId}_thumb.png`;
}

// generate dynamic image url
function getSceneCardDynamicImageUrl(imageId: string) {
  return `${assetBaseUrl}/CriwareCpks/SceneCard/${imageId}/${imageId}.mp4`;
}

async function getSceneCardWithDynamicImageIds(): Promise<Set<number>> {
  if (dynamicSceneCardIds !== null) {
    return dynamicSceneCardIds;
  }
  dynamicSceneCardIds = new Set<number>([1, 2, 3]);
  const characterCards = await getCollection('CharacterCards', { Rarity: 5 });
  const sceneCardIds = characterCards
    .map((c) => c.RankUpSceneCardId)
    .filter((c) => c) as number[];
  dynamicSceneCardIds = new Set<number>(sceneCardIds);
  return dynamicSceneCardIds;
}

async function hasDynamicImage(Id: number): Promise<boolean> {
  return (await getSceneCardWithDynamicImageIds()).has(Id);
}

export async function getSceneCardImageUrl(Id: number) {
  if (sceneCards === undefined) {
    sceneCards = await getCollection('SceneCards');
  }
  const sceneCard = sceneCards.find((c) => c.ItemId === Id);
  if (!sceneCard) {
    throw new Error(`Scene Card with Id ${Id} not found`);
  }
  const imageId = sceneCard.ImageIdentifier;
  return {
    static: getSceneCardStaticImageUrl(imageId),
    static_thumb: getSceneCardStaticThumbImageUrl(imageId),
    // now only provide one dynamic scene card for test purposes
    dynamic: (await hasDynamicImage(Id))
      ? getSceneCardDynamicImageUrl(imageId)
      : null,
  };
}
