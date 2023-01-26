<script setup lang="ts">
import { group } from 'console';
import { watch } from 'fs';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { groupBy } from 'lodash';
import { useAlbumListViewStore } from './store';
import HelpGetAlbumImage from './helper/helpGetAlbumImage.vue';
import { useAlbumInfoList } from '@/composables/hwpl/useAlbumInfoList';
import { usePagination } from '@/composables/usePagination';
import { useKeywordFilter } from '@/composables/useKeywordFilter';
import AppScaffold from '@/components/app/AppScaffold/AppScaffold.vue';
import LoadingCircle from '@/components/base/LoadingCircle.vue';

const { t } = useI18n();
const { loading, albumInfoList } = useAlbumInfoList();

const { keyword, page } = storeToRefs(useAlbumListViewStore());
const filteredAlbumCardList = useKeywordFilter(albumInfoList, keyword);

const pageSize = 18;
const { pageCount, paginatedData: paginatedAlbumInfo } = usePagination({
  data: filteredAlbumCardList,
  pageSize,
  page,
  deps: [keyword],
});
</script>

<template>
  <AppScaffold md="12" lg="8" placeholder-height="0">
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
    <v-col>
      <v-btn prepend-icon="mdi-filter-variant" @click="keyword = ''">
        {{ $t("album.all") }}
      </v-btn>
      <v-btn
        prepend-icon="mdi-filter-variant"
        @click="keyword = ' &quot;Type&quot;:1'"
      >
        {{ $t("album.type_1") }}
      </v-btn>
      <v-btn
        prepend-icon="mdi-filter-variant"
        @click="keyword = ' &quot;Type&quot;:2'"
      >
        {{ $t("album.type_2") }}
      </v-btn>
      <v-btn
        prepend-icon="mdi-filter-variant"
        @click="keyword = ' &quot;Type&quot;:3'"
      >
        {{ $t("album.type_3") }}
      </v-btn>
    </v-col>
    <v-row justify="center">
      <v-col
        v-for="album in paginatedAlbumInfo"
        :key="album.Id"
        cols="6"
        md="4"
      >
        <HelpGetAlbumImage
          :album-id="album.Id"
          :thumbnail-image-identifier="album.ThumbnailImageIdentifier"
          :name="album.Name"
        />
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
