import _ from 'lodash';
import { ref, watchEffect } from 'vue';
import { getCollectionsConcurrently } from '@/api/getCollection';
import type { Music } from '@/types/HWPL/Music';
import type { MusicalScore } from '@/types/HWPL/MusicalScore';
import type { MusicPart } from '@/types/HWPL/MusicPart';
import type { Singer } from '@/types/HWPL/Singer';
import type { Song } from '@/types/HWPL/Song';

export type MusicalScoreInfo = MusicalScore & {
  Music: Music;
  Singer: Singer;
  Song: Song;
  MusicPart: MusicPart;
};

export function useMusicalScoreInfoList() {
  const loading = ref(true);
  const musicalScoreInfoList = ref<MusicalScoreInfo[]>([]);

  watchEffect(async () => {
    const [musicalScores, musics, singers, songs, musicParts] = await getCollectionsConcurrently(
      ['MusicalScores', 'Musics', 'Singers', 'Songs', 'MusicParts'],
    );

    const musicMap = _.keyBy(musics, 'Id');
    const songMap = _.keyBy(songs, 'Id');
    const singerMap = _.keyBy(singers, 'Id');
    const musicPartMap = _.keyBy(musicParts, 'Id');

    musicalScoreInfoList.value = musicalScores.map((musicalScore) => {
      const musicPart = musicPartMap[musicalScore.MusicPartId];
      const music = musicMap[musicPart.MusicId];
      const singer = singerMap[music.SingerId];
      const song = songMap[music.SongId];
      return {
        ...musicalScore,
        Music: music,
        Singer: singer,
        Song: song,
        MusicPart: musicPart,
      };
    });
    loading.value = false;
  });

  return { loading, musicalScoreInfoList };
}
