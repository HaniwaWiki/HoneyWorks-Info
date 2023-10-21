import _ from 'lodash';
import { ref, watchEffect } from 'vue';
import type { SceneCard } from '@/types/HWPL/SceneCard';
import type { SceneCardAcquisitionRoute } from '@/types/HWPL/SceneCardAcquisitionRoute';
import type { SceneCardRouteDetail } from '@/types/HWPL/SceneCardRouteDetail';
import { getCollectionsConcurrently } from '@/api/getCollection';

export type AlbumInfo = SceneCard & {
  SceneCardAcquisitionRoute: SceneCardAcquisitionRoute;
  SceneCardRouteDetail: SceneCardRouteDetail;
};

export function useScenCardInforList() {
  const loading = ref(true);

  const sceneCardsList = ref<AlbumInfo[]>([]);
  watchEffect(async () => {
    const [sceneCards, sceneCardAcquisitionRoutes, sceneCardRouteDetails]
      = await getCollectionsConcurrently([
        'SceneCards',
        'SceneCardAcquisitionRoutes',
        'SceneCardRouteDetails',
      ]);

    const sceneCardMap = _.sortBy(sceneCards, 'ItemId');
    const sceneCardAcquisitionRouteMap = _.sortBy(
      sceneCardAcquisitionRoutes,
      'SceneCardId',
    );

    const sceneCardRouteDetailMap = _.sortBy(
      sceneCardRouteDetails,
      'SceneCardId',
    );

    sceneCardsList.value = sceneCardMap.map((sceneCard) => {
      const sceneCardAcquisitionRoute
        = sceneCardAcquisitionRouteMap[sceneCard.ItemId];
      const sceneCardRouteDetail = sceneCardRouteDetailMap[sceneCard.ItemId];
      return {
        ...sceneCard,
        SceneCardAcquisitionRoute: sceneCardAcquisitionRoute,
        SceneCardRouteDetail: sceneCardRouteDetail,
      };
    });

    loading.value = false;
  });

  return { loading, sceneCardsList };
}
