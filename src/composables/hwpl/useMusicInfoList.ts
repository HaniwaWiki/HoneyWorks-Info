import _ from 'lodash';
import { ref, watchEffect } from 'vue';
import { getCollectionsConcurrently } from '@/api/getCollection';
import type { Music } from '@/types/HWPL/Music';
import type { MusicPart } from '@/types/HWPL/MusicPart';
import type { Singer } from '@/types/HWPL/Singer';
import type { Song } from '@/types/HWPL/Song';

export type MusicInfo = Music & {
  Singer: Singer;
  Song: Song;
  MusicParts: MusicPart[];
};

export function useMusicInfoList() {
  const loading = ref(true);
  const musicInfoList = ref<MusicInfo[]>([]);

  watchEffect(async () => {
    const [songs, singers, musics, musicParts] = await getCollectionsConcurrently(
      ['Songs', 'Singers', 'Musics', 'MusicParts'],
    );

    const songMap = _.keyBy(songs, 'Id');
    const singerMap = _.keyBy(singers, 'Id');
    const musicPartMap = _.groupBy(musicParts, 'MusicId');

    musicInfoList.value = musics.map(music => ({
      ...music,
      Singer: singerMap[music.SingerId],
      Song: songMap[music.SongId],
      MusicParts: musicPartMap[music.Id],
    }));
    loading.value = false;
  });

  return { loading, musicInfoList };
}
