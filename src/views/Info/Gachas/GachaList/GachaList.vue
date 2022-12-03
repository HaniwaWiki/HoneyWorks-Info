<script setup lang='ts'>
import { storeToRefs } from 'pinia';
import { useKeywordFilter } from '../../../../composables/useKeywordFilter';
import { usePagination } from '../../../../composables/usePagination';
import HwplGachaBoxCard from '../../../../components/hwpl/HwplGachaBoxCard.vue';
import AppScaffold from '../../../../components/app/AppScaffold.vue';
import { useGachaBoxInfoList } from '../../../../composables/hwpl/useGachaBoxInfoList';
import { useGachaListViewStore } from './store';
import { useSortGachaBoxInfoList } from './helper/useSortGachaBoxInfoList';

const { keyword, sortBy, page } = storeToRefs(useGachaListViewStore());

const { loading, gachaBoxInfoList } = useGachaBoxInfoList();
const filteredGachaBoxInfoList = useKeywordFilter(gachaBoxInfoList, keyword);
const sortGachaBoxInfoList = useSortGachaBoxInfoList(
  filteredGachaBoxInfoList,
  sortBy,
);

const pageSize = 12;
const {
  pageCount,
  paginatedData: paginatedGachaBoxInfo,
} = usePagination({
  data: sortGachaBoxInfoList,
  pageSize,
  page,
  deps: [keyword, sortBy],
});
</script>

<template>
  <AppScaffold md="12" lg="8" placeholder-height="0">
    <v-row>
      <v-col cols="12" class="d-flex align-center">
        <v-text-field
          v-model="keyword"
          class="mr-4"
          hide-details
          prepend-icon="mdi-magnify"
          required
        />
      </v-col>
      <v-col cols="12" class="switch-group">
        <v-radio-group v-model="sortBy" color="primary" inline hide-details>
          <div v-t="'gacha.sort_by_colon'" />
          <v-radio
            :label="$t('gacha.start_at')"
            value="StartAt"
          />
          <v-radio
            :label="$t('gacha.id')"
            value="Id"
          />
        </v-radio-group>
      </v-col>
      <v-col v-if="loading" class="text-center">
        <v-progress-circular indeterminate color="primary" />
      </v-col>
      <v-col
        v-for="gachaBoxInfo in paginatedGachaBoxInfo"
        :key="gachaBoxInfo.Id"
        cols="12"
        md="6"
      >
        <HwplGachaBoxCard :gacha-box-info="gachaBoxInfo" to-detail />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-pagination
          v-model="page"
          active-color="primary"
          :length="pageCount"
        />
      </v-col>
    </v-row>
  </AppScaffold>
</template>
