import { getBaseUrls } from '@/config';

export function getMusicPartUrl(Id: number) {
  const { assetsBaseUrl } = getBaseUrls();
  return {
    default: `${assetsBaseUrl}/CriwareCpks/MV/${Id}/${Id}.cpk_unpacked/output/${Id}.wav`,
    lossless: `${assetsBaseUrl}/CriwareCpks/MV/${Id}/${Id}.cpk_unpacked/output/${Id}.wav`,
  };
}

export function getMusicPartMVUrl(Id: number) {
  const { assetsBaseUrl } = getBaseUrls();
  return {
    default: `${assetsBaseUrl}/CriwareCpks/MV/${Id}/${Id}.mp4`,
    '2K': `${assetsBaseUrl}/CriwareCpks/MV/${Id}/${Id}.mp4`,
  };
}
