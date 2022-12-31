import type { RouteLocationRaw } from 'vue-router';
import type { Ref } from 'vue';
import { computed } from 'vue';
import { useCollection } from '@/composables/useCollection';
import type { NearbyPage } from '@/components/app/AppScaffold/types';
import type { MusicPart } from '@/types/HWPL/MusicPart';
import type { MusicInfo } from '@/composables/hwpl/useMusicInfoList';
import { useMusicInfoList } from '@/composables/hwpl/useMusicInfoList';

function getTitleAndLink(musicPart: MusicPart | undefined, musicInfoList: MusicInfo[]): [string | undefined, RouteLocationRaw | undefined] {
  if (!musicPart || musicInfoList.length === 0)
    return [undefined, undefined];

  const musicInfo = musicInfoList.find(info => info.Id === musicPart.MusicId);
  const name = `${musicInfo?.Song?.Name ?? ''} ${musicPart.Name}`;
  return [name, { name: 'Music Part Detail', params: { id: musicPart.Id } }];
}

export function useNearbyPage(id: Ref<number>): Ref<NearbyPage> {
  const { collection: musicParts } = useCollection('MusicParts');
  const { musicInfoList } = useMusicInfoList();
  return computed<NearbyPage>(() => {
    const index = musicParts.value.findIndex(musicPart => musicPart.Id === id.value);
    const [prevTitle, prevTo] = getTitleAndLink(musicParts.value[index - 1], musicInfoList.value);
    const [nextTitle, nextTo] = getTitleAndLink(musicParts.value[index + 1], musicInfoList.value);
    return {
      prevTitle,
      prevTo,
      nextTitle,
      nextTo,
    };
  });
}
