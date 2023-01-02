import { getBaseUrls } from '@/api/baseUrls';
import axios from '@/utils/request';
import type { GachaProbabilityPack } from '@/types/HWPL/extra/GachaProbabilityPack';

export async function getGachaProbability(gachaBoxId: number) {
  const { staticApiBaseUrl } = getBaseUrls();
  const url = `${staticApiBaseUrl}/extra/GachaProbability/${gachaBoxId}.json`;
  const response = await axios.get(url);
  return response.data as GachaProbabilityPack;
}
