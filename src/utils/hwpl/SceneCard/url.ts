import { getCollection } from '@/api/common';
import type { SceneCard } from '@/types/HWPL/SceneCard';
import { hasDynamicImage } from '@/utils/hwpl/SceneCard/hasDynamicImage';
import { getBaseUrls } from '@/utils/baseUrlList';

// cached scene cards list
let sceneCards: SceneCard[];

// generate static image url
export function getSceneCardStaticImageUrl(imageId: string) {
  const { assetsBaseUrl } = getBaseUrls();
  return `${assetsBaseUrl}/Assets/SceneCards/${imageId}.png`;
}

// generate static thumb image url
export function getSceneCardStaticThumbImageUrl(imageId: string) {
  const { assetsBaseUrl } = getBaseUrls();
  return `${assetsBaseUrl}/Assets/SceneCards_thumb/${imageId}_thumb.png`;
}

// generate dynamic image url
function getSceneCardDynamicImageUrl(imageId: string) {
  const { assetsBaseUrl } = getBaseUrls();
  return `${assetsBaseUrl}/CriwareCpks/SceneCard/${imageId}/${imageId}.mp4`;
}

export async function getSceneCardImageUrl(Id: number) {
  if (sceneCards === undefined)
    sceneCards = await getCollection('SceneCards');

  const sceneCard = sceneCards.find(c => c.ItemId === Id);
  if (!sceneCard)
    throw new Error(`Scene Card with Id ${Id} not found`);

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
