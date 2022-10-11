import { assetBaseUrl } from '@/config';

export function getMusicPartUrl(Id: number) {
  return {
    default: `${assetBaseUrl}/CriwareCpks/MV/${Id}/${Id}.cpk_unpacked/output/${Id}.wav`,
    lossless: `${assetBaseUrl}/CriwareCpks/MV/${Id}/${Id}.cpk_unpacked/output/${Id}.wav`,
  };
}

export function getMusicPartMVUrl(Id: number) {
  // now only provide one MV for test purposes
  // eslint-disable-next-line no-param-reassign
  Id = 1001011;
  return {
    default: `${assetBaseUrl}/CriwareCpks/MV/${Id}/${Id}.mp4`,
    '2K': `${assetBaseUrl}/CriwareCpks/MV/${Id}/${Id}.mp4`,
  };
}
