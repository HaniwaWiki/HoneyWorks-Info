import type { Ref } from 'vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Resource } from '@/components/base/ResourceTabs/Resource';
import { videoResourceOption } from '@/components/base/ResourceTabs/Resource';
import {
  getMusicLogoUrl,
  getMusicPartMVUrl,
  getMusicPartTitleImageUrl,
  getMusicPartUrl,
} from '@/utils/hwpl/MusicPart/url';
import type { MusicPart } from '@/types/HWPL/MusicPart';
import type { Music } from '@/types/HWPL/Music';

export function useMusicPartResources(
  musicPart: Ref<MusicPart | null>,
  music: Ref<Music | null>,
): Ref<Resource[]> {
  const { t } = useI18n();

  return computed(() => {
    if (musicPart.value === null)
      return [];

    const { Id } = musicPart.value;
    return [
      {
        name: t('music_part.title_image'),
        key: 'title_image',
        url: getMusicPartTitleImageUrl({ Id }),
      },
      {
        name: t('music_part.music_logo'),
        key: 'music_logo',
        url: music.value ? getMusicLogoUrl(music.value.Id) : '',
      },
      {
        name: t('music_part.mv'),
        key: 'mv',
        url: getMusicPartMVUrl(Id).default,
        options: videoResourceOption,
      },
      {
        name: t('music_part.music'),
        key: 'music',
        url: getMusicPartUrl(Id).default,
      },
    ];
  });
}
