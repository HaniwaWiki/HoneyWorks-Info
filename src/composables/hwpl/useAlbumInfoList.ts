import _ from 'lodash';
import { ref, watchEffect } from 'vue';
import { asyncComputed } from '@vueuse/core';
import type { SceneCardInfo } from './useSceneCardInfoList';
import { useSceneCardInfoList } from './useSceneCardInfoList';
import type { Album } from '@/types/HWPL/Album';
import { getCollectionsConcurrently } from '@/api/getCollection';

export type AlbumInfo = Album & {
  SceneCardInfo: SceneCardInfo[];
};

export function useAlbumInfoList() {
  const loading = ref(true);

  const albumInfoList = ref<AlbumInfo[]>([]);
  const { loading: loadingSceneCard, sceneCardsList } = useSceneCardInfoList();

  const albumList = asyncComputed(async () => {
    const [albumList] = await getCollectionsConcurrently(['Albums']);
    return albumList;
  }, []);
  watchEffect(async () => {
    if (!loadingSceneCard.value) {
      const sceneCardMap = _.groupBy(sceneCardsList.value, 'AlbumId');
      albumInfoList.value = albumList.value.map((album) => {
        return {
          ...album,
          SceneCardInfo: sceneCardMap[album.Id.toString()],
        };
      });
      loading.value = false;
    }
  });

  return { loading, albumInfoList };
}
