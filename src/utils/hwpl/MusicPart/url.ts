import { getBaseUrls } from '@/config';

export function getMusicPartUrl(Id: number) {
  const { assetsBaseUrl } = getBaseUrls();
  return {
    default: `${assetsBaseUrl}/CriwareCpks/MV/${Id}/${Id}.cpk_unpacked/output/${Id}.wav`,
    lossless: `${assetsBaseUrl}/CriwareCpks/MV/${Id}/${Id}.cpk_unpacked/output/${Id}.wav`,
  };
}

export function getMusicPartTitleImageUrl({ Id, thumb = false }: {
  Id: number;
  thumb?: boolean;
}) {
  const { assetsBaseUrl } = getBaseUrls();
  return thumb
    ? `${assetsBaseUrl}/Assets/Music/MVTitleImages_thumb/${Id}_thumb.png`
    : `${assetsBaseUrl}/Assets/Music/MVTitleImages/${Id}.png`;
}

export function getMusicLogoUrl(Id: number) {
  const { assetsBaseUrl } = getBaseUrls();
  return `${assetsBaseUrl}/Assets/Music/MusicLogo/${Id}_logo.png`;
}

export function getMusicPartMVUrl(Id: number) {
  const { assetsBaseUrl } = getBaseUrls();
  return {
    'default': `${assetsBaseUrl}/CriwareCpks/MV/${Id}/${Id}.mp4`,
    '2K': `${assetsBaseUrl}/CriwareCpks/MV/${Id}/${Id}.mp4`,
  };
}
