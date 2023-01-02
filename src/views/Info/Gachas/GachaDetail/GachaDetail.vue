<script setup lang='ts'>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useGachaResources } from './helper/useGachaResources';
import GachaDetailGeneral from './helper/GachaDetailGeneral.vue';
import GachaProbabilityExpansionPanels from './helper/GachaProbabilityOverview.vue';
import { useNearbyPage } from './helper/useNearbyPage';
import { useGachaBoxInfoList } from '@/composables/hwpl/useGachaBoxInfoList';
import AppScaffold from '@/components/app/AppScaffold/AppScaffold.vue';
import ResourceTabs from '@/components/base/ResourceTabs/ResourceTabs.vue';
import ButtonEventStatus from '@/components/base/ButtonEventStatus.vue';

const route = useRoute();
const gachaBoxId = computed(() => Number(route.params.id));

const { gachaBoxInfoList } = useGachaBoxInfoList();
const gachaBoxInfo = computed(() => gachaBoxInfoList.value.find(box => box.Id === gachaBoxId.value) ?? null);

const gachaResources = useGachaResources(gachaBoxInfo);
const nearbyPage = useNearbyPage(gachaBoxId);
</script>

<template>
  <AppScaffold
    :title="gachaBoxInfo?.Name"
    :nearby-page="nearbyPage"
  >
    <ButtonEventStatus
      v-if="gachaBoxInfo"
      size="small"
      :start-at="gachaBoxInfo.Term.StartAt"
      :end-at="gachaBoxInfo.Term.EndedAt"
    />

    <v-card>
      <ResourceTabs :resources="gachaResources" />
    </v-card>

    <GachaDetailGeneral
      :gacha-box-info="gachaBoxInfo"
    />

    <GachaProbabilityExpansionPanels
      :gacha-box-id="gachaBoxId"
    />
  </AppScaffold>
</template>
