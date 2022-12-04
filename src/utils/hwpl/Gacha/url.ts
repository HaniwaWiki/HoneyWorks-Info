import { getGachaImageList } from '@/utils/hwpl/Gacha/checkFileList';
import { getBaseUrls } from '@/utils/baseUrlList';

export type GachaImageUrls = {
  background?: string;
  backgroundWithCard: string[];
  banner: string;
  logo?: string;
};

export async function getGachaImageUrls(Id: number): Promise<GachaImageUrls> {
  const gachaImageUrls: GachaImageUrls = { backgroundWithCard: [], banner: '' };

  const { assetsBaseUrl } = getBaseUrls();
  const gachaBaseUrl = `${assetsBaseUrl}/Assets/Gacha/${Id}`;
  const imageList = await getGachaImageList(Id);

  imageList.forEach((filename) => {
    if (/logo/.test(filename))
      gachaImageUrls.logo = `${gachaBaseUrl}/${filename}`;
    else if (/banner/.test(filename))
      gachaImageUrls.banner = `${gachaBaseUrl}/${filename}`;
    else if (new RegExp(`${Id}_back`).test(filename))
      gachaImageUrls.background = `${gachaBaseUrl}/${filename}`;
    else if (new RegExp(`${Id}_\\d{6}_back`).test(filename))
      gachaImageUrls.backgroundWithCard.push(`${gachaBaseUrl}/${filename}`);
    else
      console.warn(`Unmatched gacha image file: ${filename}`);
  });

  return gachaImageUrls;
}
