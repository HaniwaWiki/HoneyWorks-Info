import _ from 'lodash';
import { computed } from 'vue';
import { useCollection } from '@/composables/useCollection';
import type { Music } from '@/types/HWPL/Music';
import type { Singer } from '@/types/HWPL/Singer';
import type { Song } from '@/types/HWPL/Song';
import type { MusicPart } from '@/types/HWPL/MusicPart';

export type MusicInfo = Music & {
  Singer: Singer;
  Song: Song;
  MusicParts: MusicPart[];
};

export function useMusicInfo() {
  const { loading: loadingSongs, collection: songs } = useCollection('Songs');
  const { loading: loadingSingers, collection: singers } = useCollection('Singers');
  const { loading: loadingMusics, collection: musics } = useCollection('Musics');
  const { loading: loadingMusicParts, collection: musicParts } = useCollection('MusicParts');

  const songMap = computed(() => _.keyBy(songs.value, 'Id'));
  const singerMap = computed(() => _.keyBy(singers.value, 'Id'));
  const musicPartMap = computed(() => _.groupBy(musicParts.value, 'MusicId'));

  const loading = computed(() => loadingSongs.value || loadingSingers.value || loadingMusics.value || loadingMusicParts.value);
  const musicInfo = computed(() => loading.value
    ? []
    : musics.value.map(music => ({
      ...music,
      Singer: singerMap.value[music.SingerId],
      Song: songMap.value[music.SongId],
      MusicParts: musicPartMap.value[music.Id],
    })));

  return { loading, musicInfo };
}
