<script setup lang='ts'>
import { computed } from 'vue';
import type { GachaBox } from '../../../../types/HWPL/GachaBox';
import { useGachaBoxInfoList } from '../../../../composables/hwpl/useGachaBoxInfoList';
import HwplGachaBoxCard from '../../HwplGachaBoxCard.vue';
import { useSortGachaBoxInfoList } from '../../../../views/Info/Gachas/GachaList/helper/useSortGachaBoxInfoList';

const props = defineProps<{ gachaBoxes: GachaBox[]; }>();

const { gachaBoxInfoList } = useGachaBoxInfoList();
const filteredGachaBoxInfoList = computed(() => gachaBoxInfoList.value
  .filter(
    gachaBoxInfo => props.gachaBoxes.some(gachaBox => gachaBox.Id === gachaBoxInfo.Id))
  // the slice is for truncation when there are too much gacha boxes
  // TODO: implement 'load more' to load more gacha boxes
  .slice(0, 6),
);
const sortedGachaBoxInfoList = useSortGachaBoxInfoList(filteredGachaBoxInfoList, 'StartAt');
</script>

<template>
  <v-expansion-panel
    :title="$t('components.item_source.gacha_boxes', { count: filteredGachaBoxInfoList.length })"
  >
    <v-expansion-panel-text>
      <v-container>
        <v-row>
          <v-col
            v-for="gachaBoxInfo in sortedGachaBoxInfoList"
            :key="gachaBoxInfo.Id"
            :cols="12"
            :md="6"
          >
            <HwplGachaBoxCard :gacha-box-info="gachaBoxInfo" to-detail />
          </v-col>
        </v-row>
      </v-container>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
