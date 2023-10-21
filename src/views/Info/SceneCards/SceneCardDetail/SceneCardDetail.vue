<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { asyncComputed } from '@vueuse/core';
import { useNearbyPage } from './helper/useNearbyPage';
import SceneCardDetailGeneral from './helper/SceneCardDetailGeneral.vue';
import { getSceneCardImageUrls } from '@/utils/hwpl/SceneCard/url';
import { useFirstOfCollection } from '@/composables/useCollection';
import AppScaffold from '@/components/app/AppScaffold/AppScaffold.vue';
const route = useRoute();
const sceneCardId = computed(() => Number(route.params.id));

const { item: sceneCard } = useFirstOfCollection(
  'SceneCards',
  computed(() => ({
    ItemId: sceneCardId.value,
  })),
);

const { item: sceneCardRouteDetail } = useFirstOfCollection(
  'SceneCardRouteDetails',
  computed(() => ({
    SceneCardId: sceneCardId.value,
  })),
);

const { item: SceneCardAcquisitionRoute } = useFirstOfCollection(
  'SceneCardAcquisitionRoutes',
  computed(() => ({
    SceneCardId: sceneCardId.value,
  })),
);
const nearbyPage = useNearbyPage(sceneCardId);

const cardUrl = asyncComputed(async () => {
  if (sceneCard.value?.ItemId) {
    const cardUrl = await getSceneCardImageUrls(sceneCard.value?.ItemId);
    return cardUrl.static;
  }
  return undefined;
});
</script>

<template>
  <AppScaffold :title="sceneCard?.Name" :nearby-page="nearbyPage">
    <v-card>
      <div class="position-relative">
        <v-img :src="cardUrl" :aspect-ratio="16 / 9" />
      </div>
      <SceneCardDetailGeneral
        :scene-card-start-at="sceneCard?.StartAt"
        :scene-card-album-id="sceneCard?.AlbumId"
        :scene-card-item-id="sceneCard?.ItemId"
        :scene-card-route-detail="sceneCardRouteDetail"
        :scene-card-acquisition-route="SceneCardAcquisitionRoute"
      />
    </v-card>
  </AppScaffold>
</template>
