import { getCollection } from '@/api/getCollection';

// only 5-Rarity Character Cards have dynamic Scene Card images when cards are rank up
let dynamicSceneCardIds: Set<number> | null = null;

async function getSceneCardWithDynamicImageIds(): Promise<Set<number>> {
  if (dynamicSceneCardIds !== null)
    return dynamicSceneCardIds;

  const characterCards = await getCollection('CharacterCards', { Rarity: 5 });
  const sceneCardIds = characterCards
    .map(c => c.RankUpSceneCardId)
    .filter(c => c) as number[];
  dynamicSceneCardIds = new Set<number>(sceneCardIds);
  return dynamicSceneCardIds;
}

// check if a scene card has dynamic image
export async function hasDynamicImage(Id: number): Promise<boolean> {
  return (await getSceneCardWithDynamicImageIds()).has(Id);
}
