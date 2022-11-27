import { getBaseUrls } from '@/utils/baseUrlList';

export type GetCharacterCardImageUrlParam = {
  Id: number;
  evolved?: boolean;
  icon?: boolean;
  thumb?: boolean;
};

export function getCharacterCardImageUrl({
  Id,
  evolved = false,
  icon = false,
}: GetCharacterCardImageUrlParam) {
  const { assetsBaseUrl } = getBaseUrls();
  const rank = evolved ? '2' : '1';
  const type = icon ? 'icon' : 'sd';
  // HWPL_Data/assets/Assets/Character/1001001/1001001_1_icon.png
  return `${assetsBaseUrl}/Assets/Character/${Id}/${Id}_${rank}_${type}.png`;
}
