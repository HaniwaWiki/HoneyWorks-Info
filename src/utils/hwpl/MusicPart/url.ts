import { assetBaseUrl } from '@/config';

export function getMusicPartUrl(Id: number) {
  return {
    default: `${assetBaseUrl}/CriwareCpks/MV/${Id}/${Id}.cpk_unpacked/output/${Id}.wav`,
    lossless: `${assetBaseUrl}/CriwareCpks/MV/${Id}/${Id}.cpk_unpacked/output/${Id}.wav`,
  };
}

export function getMusicPartMVUrl(Id: number) {
  return {
    default: `${assetBaseUrl}/CriwareCpks/MV/${Id}/${Id}.cpk_unpacked/${Id}.usm.m2v`,
    '2K': `${assetBaseUrl}/CriwareCpks/MV/${Id}/${Id}.cpk_unpacked/${Id}.usm.m2v`,
  };
}
