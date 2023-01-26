<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSceneCardListViewStore } from './store';
import { useSceneCardInfoList } from '@/composables/hwpl/useSceneCardInfoList';
import LoadingCircle from '@/components/base/LoadingCircle.vue';
import { usePagination } from '@/composables/usePagination';
import HwplSceneCardImage from '@/components/hwpl/HwplSceneCardImage.vue';
import AppScaffold from '@/components/app/AppScaffold/AppScaffold.vue';
import { useKeywordFilter } from '@/composables/useKeywordFilter';

const { loading, sceneCardsList } = useSceneCardInfoList();

const { keyword, page } = storeToRefs(useSceneCardListViewStore());
const filteredSceneCardList = useKeywordFilter(sceneCardsList, keyword);
const pageSize = 28;
const { pageCount, paginatedData: paginatedSceneCardInfo } = usePagination({
  data: filteredSceneCardList,
  pageSize,
  page,
  deps: [keyword],
});
</script>

<template>
  <AppScaffold md="12" lg="8" placeholder-height="0">
    <!-- loading -->
    <!-- search bar -->
    <v-col cols="12" class="d-flex align-center">
      <v-text-field
        v-model="keyword"
        class="mr-4"
        hide-details
        prepend-icon="mdi-magnify"
        required
      />
    </v-col>

    <v-col v-if="loading">
      <LoadingCircle />
    </v-col>

    <!-- information -->
    <v-row justify="center">
      <v-col
        v-for="sceneCard in paginatedSceneCardInfo"
        :key="sceneCard.ItemId"
        cols="3"
        md="3"
      >
        <HwplSceneCardImage
          :scene-id="sceneCard.ItemId"
          :name="sceneCard.Name"
        />
      </v-col>
    </v-row>
    <!-- page bar -->
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
