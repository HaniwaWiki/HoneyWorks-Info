import type { Ref } from 'vue';
import { computed, unref } from 'vue';
import { useCollection, useFirstOfCollection } from '@/composables/useCollection';
import type { MaybeRef } from '@/types/vue/ref';
import type { Music } from '@/types/HWPL/Music';
import type { MusicalScore } from '@/types/HWPL/MusicalScore';
import type { MusicPart } from '@/types/HWPL/MusicPart';
import type { Song } from '@/types/HWPL/Song';
import type { Singer } from '@/types/HWPL/Singer';

export type MusicPartInfo = {
  musicPart: Ref<MusicPart | null>;
  music: Ref<Music | null>;
  song: Ref<Song | null>;
  singer: Ref<Singer | null>;
  musicalScores: Ref<MusicalScore[]>;
};

export function useMusicPartInfo(musicPartId: MaybeRef<number>): MusicPartInfo {
  const { item: musicPart } = useFirstOfCollection('MusicParts', computed(() => ({
    Id: unref(musicPartId),
  })));
  const { item: music } = useFirstOfCollection('Musics', computed(() => ({
    Id: musicPart?.value?.MusicId,
  })));
  const { item: song } = useFirstOfCollection('Songs', computed(() => ({
    Id: music.value?.SongId,
  })));
  const { item: singer } = useFirstOfCollection('Singers', computed(() => ({
    Id: music.value?.SingerId,
  })));
  const { collection: musicalScores } = useCollection('MusicalScores', computed(() => ({
    MusicPartId: unref(musicPartId),
  })));

  return {
    musicPart,
    music,
    song,
    singer,
    musicalScores,
  };
}

