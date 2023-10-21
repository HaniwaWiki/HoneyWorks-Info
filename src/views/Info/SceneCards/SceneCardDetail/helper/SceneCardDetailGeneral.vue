<script setup lang="ts">
import { ComputedRef, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { SceneCard } from '@/types/HWPL/SceneCard';
import type { SceneCardRouteDetail } from '@/types/HWPL/SceneCardRouteDetail';
import type { SceneCardAcquisitionRoute } from '@/types/HWPL/SceneCardAcquisitionRoute';
import { useFirstOfCollection } from '@/composables/useCollection';
// import { getItemSourceAggregateInformation } from "@/api/getItemSource";
const props = defineProps<{
  sceneCard: SceneCard | null;
  sceneCardRouteDetail: SceneCardRouteDetail | null;
  sceneCardAcquisitionRoute: SceneCardAcquisitionRoute | null;
}>();
const { d, t } = useI18n();

const { item: albums } = useFirstOfCollection(
  'Albums',
  computed(() => ({
    Id: props.sceneCard?.AlbumId,
  })),
);

// console.log(alubum);
// const itemSourceAggregateInformation = asyncComputed(
//   getItemSourceAggregateInformation,
//   []
// );
// const releaseTime = computed(() => {
//   if (props.sceneCardAcquisitionRoute?.TermId) {
//     const releaseTimestamp = itemSourceAggregateInformation.value.find(
//       (info: { ItemId: number | undefined }) =>
//         info.ItemId === props.sceneCard?.StartAt
//     )?.ReleaseTimestamp;
//     return releaseTimestamp
//       ? d(new Date(releaseTimestamp * 1000), "long")
//       : t("global.unknown");
//   }
//   return t("global.unknown");
// });

const itemInList = computed(() => {
  if (props.sceneCard && props.sceneCardRouteDetail && albums.value) {
    return [
      {
        text: props.sceneCard?.ItemId,
        subtitle: t('scene_cards.scene_card_Id'),
      },
      {
        text: albums.value?.Name,
        subtitle: t('scene_cards.scene_card_belong'),
      },
      {
        text: props.sceneCardAcquisitionRoute?.TermId,
        subtitle: t('scene_cards.scene_card_release_date'),
      },
      {
        text: props.sceneCardRouteDetail?.RouteText,
        subtitle: t('scene_cards.scene_card_acquisition_conditions_guide'),
      },
      {
        text: props.sceneCardRouteDetail?.NextScene,
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
      >
        <v-list-item-title>
          {{ item.text }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ item.subtitle }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>
