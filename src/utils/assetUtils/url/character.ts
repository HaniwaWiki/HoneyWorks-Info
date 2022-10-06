import { assetBaseUrl } from '@/config';
import { getCollection } from '@/api/common';

export async function getCharacterImageUrl(
  Id: number,
  Rank: 1 | 2 = 1,
  icon = false
) {
  const character = (await getCollection('Characters', { Id }))[0];
  const cardId = character.DefaultCharacterCardId;
  const type = icon ? 'icon' : 'sd';
  // HWPL_Data/assets/Assets/Character/1001001/1001001_1_icon.png
  return `${assetBaseUrl}/Assets/Character/${cardId}/${cardId}_${Rank}_${type}.png`;
}
