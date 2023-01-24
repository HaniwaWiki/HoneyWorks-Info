import _ from 'lodash';
import { ref, watchEffect } from 'vue';
import type { SceneCardInfo } from './useSceneCardInfoList';
import { useScenCardInforList } from './useSceneCardInfoList';
import type { Album } from '@/types/HWPL/Album';
import { getCollectionsConcurrently } from '@/api/getCollection';

export type AlbumInfo = Album & {
  SceneCardInfo: SceneCardInfo[];
};

export function useAlbumInforList() {
  const loading = ref(true);

  const albumInfoList = ref<AlbumInfo[]>([]);

  watchEffect(async () => {
    const sceneCardList = useScenCardInforList().sceneCardsList;
    const [albumList] = await getCollectionsConcurrently(['Albums']);

    const sceneCardMap = _.groupBy(sceneCardList.value, 'AlbumId');

    albumInfoList.value = albumList.map((album) => {
      return {
        ...album,
        SceneCardInfo: sceneCardMap[album.Id],
      };
    });
    loading.value = false;
  });
  return { loading, albumInfoList };
}
