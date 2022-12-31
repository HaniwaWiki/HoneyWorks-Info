<script setup lang='ts'>
import { computed } from 'vue';
import { useSortGachaBoxInfoList } from '@/views/Info/Gachas/GachaList/helper/useSortGachaBoxInfoList';
import type { GachaBoxInfo } from '@/composables/hwpl/useGachaBoxInfoList';
import LazyLoadList from '@/assemble/LazyLoadList.vue';
import HwplGachaBoxCard from '@/HwplGachaBoxCard.vue';
import { useGachaBoxInfoList } from '@/composables/hwpl/useGachaBoxInfoList';
import type { GachaBox } from '@/types/HWPL/GachaBox';

const props = defineProps<{ gachaBoxes: GachaBox[]; }>();

const { gachaBoxInfoList } = useGachaBoxInfoList();
const filteredGachaBoxInfoList = computed(() => gachaBoxInfoList.value
  .filter(
    gachaBoxInfo => props.gachaBoxes.some(gachaBox => gachaBox.Id === gachaBoxInfo.Id)),
);
const sortedGachaBoxInfoList = useSortGachaBoxInfoList(filteredGachaBoxInfoList, 'StartAt');
</script>

<template>
  <v-expansion-panel
    :title="$t('components.item_source.in_gacha_boxes_total', [gachaBoxes.length])"
  >
    <v-expansion-panel-text>
      <v-container>
        <v-row>
          <LazyLoadList
            :page-size="6"
            :items="sortedGachaBoxInfoList"
            :item-key="(gachaBoxInfo: GachaBoxInfo) => gachaBoxInfo.Id"
          >
            <template #default="{ item: gachaBoxInfo }">
              <v-col :cols="12" :md="6">
                <HwplGachaBoxCard :gacha-box-info="gachaBoxInfo" to-detail />
              </v-col>
            </template>
          </LazyLoadList>
        </v-row>
      </v-container>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
