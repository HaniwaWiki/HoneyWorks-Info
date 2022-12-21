<script setup lang="ts">
import { computed, ref } from 'vue';

/*
 * This component is for lazily showing long list for better performance.
 * It takes items and pageSize as props, and a template[name="default"] to render every item.
 * e. g.
 * <LazyLoadList :page-size="6" :items="sortedGachaBoxInfoList" :item-key="(gachaBoxInfo) => gachaBoxes.Id">
 *   <template #default="{ item: gachaBoxInfo }">
 *     <v-col :cols="12" :md="6">
 *       <HwplGachaBoxCard :gacha-box-info="gachaBoxInfo" to-detail />
 *     </v-col>
 *   </template>
 * </LazyLoadList>
 *
 * You can also define custom "loadMore" button like below:
 * <template #loadMore="{ onClick }">
 *   <v-btn @click="onClick" />
 * </template>
 */

// props definition
type Props<T> = {
  items: T[];
  itemKey: (item: T) => string | number;
  pageSize: number;
};

const props = defineProps<Props<any>>();

const page = ref(1);
const slicedItems = computed(() => props.items.slice(0, page.value * props.pageSize));
</script>

<template>
  <slot
    v-for="item in slicedItems"
    :key="props.itemKey(item)"
    :item="item"
  />
  <slot
    v-if="slicedItems.length < items.length"
    name="loadMore"
    @click="page++"
  >
    <v-btn
      color="primary"
      block
      @click="page++"
    >
      {{ $t('global.load_more') }}
    </v-btn>
  </slot>
</template>
