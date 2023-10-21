import { getBaseUrls } from '@/api/baseUrls';

export function getAlbumUrl(id: number): string {
  const { assetsBaseUrl } = getBaseUrls();
  return `${assetsBaseUrl}/Assets/SceneCards/${id}.png`;
}
