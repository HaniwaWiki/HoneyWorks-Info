import _ from 'lodash';
import { ref, watchEffect } from 'vue';
import type { SceneCard } from '@/types/HWPL/SceneCard';
import type { SceneCardAcquisitionRoute } from '@/types/HWPL/SceneCardAcquisitionRoute';
import type { SceneCardRouteDetail } from '@/types/HWPL/SceneCardRouteDetail';
import { getCollectionsConcurrently } from '@/api/getCollection';

export type SceneCardInfo = SceneCard & {
  SceneCardAcquisitionRoute: SceneCardAcquisitionRoute;
  SceneCardRouteDetail: SceneCardRouteDetail;
};

export function useSceneCardInfoList() {
  const loading = ref(true);

  const sceneCardsList = ref<SceneCardInfo[]>([]);
  watchEffect(async () => {
    const [sceneCards, sceneCardAcquisitionRoutes, sceneCardRouteDetails]
      = await getCollectionsConcurrently([
        'SceneCards',
        'SceneCardAcquisitionRoutes',
        'SceneCardRouteDetails',
      ]);

    // const sceneCardMap = _.keyBy(sceneCards, 'ItemId');
    const sceneCardAcquisitionRouteMap = _.keyBy(
      sceneCardAcquisitionRoutes,
      'SceneCardId',
    );

    const sceneCardRouteDetailMap = _.keyBy(
      sceneCardRouteDetails,
      'SceneCardId',
    );

    sceneCardsList.value = sceneCards.map(sceneCard => ({
      ...sceneCard,
      SceneCardAcquisitionRoute: sceneCardAcquisitionRouteMap[sceneCard.ItemId],
      SceneCardRouteDetail: sceneCardRouteDetailMap[sceneCard.ItemId],
    }));

    loading.value = false;
  });

  return { loading, sceneCardsList };
}
