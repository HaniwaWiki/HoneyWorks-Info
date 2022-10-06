import { assetBaseUrl } from '@/config';

export function getCharacterCardImageUrl(
  Id: number,
  Rank: 1 | 2 = 1,
  icon = false
) {
  const type = icon ? 'icon' : 'sd';
  // HWPL_Data/assets/Assets/Character/1001001/1001001_1_icon.png
  return `${assetBaseUrl}/Assets/Character/${Id}/${Id}_${Rank}_${type}.png`;
}
