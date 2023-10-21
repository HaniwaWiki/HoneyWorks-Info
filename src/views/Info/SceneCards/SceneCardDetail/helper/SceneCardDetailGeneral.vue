<script setup lang="ts">
import { ComputedRef, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { SceneCard } from '@/types/HWPL/SceneCard';
import type { SceneCardRouteDetail } from '@/types/HWPL/SceneCardRouteDetail';
import type { SceneCardAcquisitionRoute } from '@/types/HWPL/SceneCardAcquisitionRoute';
import { useFirstOfCollection } from '@/composables/useCollection';
import type { VuetifyListItem } from '@/types/vuetify/listItem';
// import { getItemSourceAggregateInformation } from "@/api/getItemSource";
const props = defineProps<{
  sceneCardStartAt: number | undefined;
  sceneCardAlbumId: number | undefined;
  sceneCardItemId: number | undefined;
  sceneCardRouteDetail: SceneCardRouteDetail | null;
  sceneCardAcquisitionRoute: SceneCardAcquisitionRoute | null;
}>();
const { t, d } = useI18n();

const { item: albums } = useFirstOfCollection(
  'Albums',
  computed(() => ({
    Id: props.sceneCardAlbumId,
  })),
);
const itemInList = computed(() => {
  if (props.sceneCardRouteDetail && albums.value && props.sceneCardStartAt) {
    return [
      {
        prependIcon: 'mdi-music-accidental-sharp',
        text: props.sceneCardItemId,
        subtitle: t('scene_cards.scene_card_Id'),
      },
      {
        prependIcon: 'mdi-text-short',
        text: albums.value?.Name,
        subtitle: t('scene_cards.scene_card_belong'),
      },
      {
        prependIcon: 'mdi-calendar',
        text: d(new Date(props.sceneCardStartAt * 1000), 'long'),
        subtitle: t('scene_cards.scene_card_release_date'),
      },
      {
        prependIcon: 'mdi-arrange-bring-forward',
        text: props.sceneCardRouteDetail?.RouteText,
        subtitle: t('scene_cards.scene_card_acquisition_conditions_guide'),
      },
      {
        prependIcon: 'mdi-database',
        text: t(`scene_cards.${props.sceneCardRouteDetail?.NextScene}`),
        subtitle: t('scene_cards.scene_card_acquisition_conditions'),
      },
    ];
  }
  return [];
});
</script>

<template>
  <v-card>
    <v-list>
      <v-list-item
        v-for="(item, i) in itemInList"
        :key="i"
        :value="item"
        color="primary"
        item-props
        lines="two"
        :prepend-icon="item.prependIcon"
      >
        <v-list-item-title style="white-space: normal">
          {{ item.text }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ item.subtitle }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>
