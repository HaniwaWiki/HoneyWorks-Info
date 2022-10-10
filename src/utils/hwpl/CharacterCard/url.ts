import { assetBaseUrl } from '@/config';
import { Resource } from '@/components/base/ResourceTabs/types';
import { RouteLocationRaw } from 'vue-router';

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
  const rank = evolved ? '2' : '1';
  const type = icon ? 'icon' : 'sd';
  // HWPL_Data/assets/Assets/Character/1001001/1001001_1_icon.png
  return `${assetBaseUrl}/Assets/Character/${Id}/${Id}_${rank}_${type}.png`;
}
