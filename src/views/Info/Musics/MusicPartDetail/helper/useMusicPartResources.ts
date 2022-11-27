import type { Ref } from 'vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Resource } from '@/components/base/ResourceTabs/Resource';
import { videoResourceOption } from '@/components/base/ResourceTabs/Resource';
import type { MusicPartInfo } from '@/composables/hwpl/useMusicPartInfo';
import {
  getMusicLogoUrl,
  getMusicPartMVUrl,
  getMusicPartTitleImageUrl,
  getMusicPartUrl,
} from '@/utils/hwpl/MusicPart/url';

export function useMusicPartResources({
  musicPart,
  music,
}: MusicPartInfo): Ref<Resource[]> {
  const { t } = useI18n();

  return computed(() => {
    if (musicPart.value === null)
      return [];

    const { Id } = musicPart.value;
    return [
      {
        name: t('music_part.title_image'),
        url: getMusicPartTitleImageUrl({ Id }),
      },
      {
        name: t('music_part.music_logo'),
        url: music.value ? getMusicLogoUrl(music.value.Id) : '',
      },
      {
        name: t('music_part.mv'),
        url: getMusicPartMVUrl(Id).default,
        options: videoResourceOption,
      },
      {
        name: t('music_part.music'),
        url: getMusicPartUrl(Id).default,
      },
    ];
  });
}
