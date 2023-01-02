<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useMusicListViewStore } from './store';
import { useSortMusicInfoList } from './helper/useSortMusicList';
import type { MusicInfo } from '@/composables/hwpl/useMusicInfoList';
import { useMusicInfoList } from '@/composables/hwpl/useMusicInfoList';
import LoadingCircle from '@/components/base/LoadingCircle.vue';
import HwplMusicPartImageWithLogo from '@/components/hwpl/HwplMusicPartImageWithLogo.vue';
import AppScaffold from '@/components/app/AppScaffold/AppScaffold.vue';
import { usePagination } from '@/composables/usePagination';
import { useKeywordFilter } from '@/composables/useKeywordFilter';

// options from user
const { keyword, sortBy, page } = storeToRefs(useMusicListViewStore());
const selectedMusicInfo = ref<MusicInfo | undefined>(undefined);
// bind selectedMusicInfo and showDialog will cause minor UI bug
const showDialog = ref(false);

// fetch, filter, sort and paginate data
const { loading, musicInfoList } = useMusicInfoList();
const filteredMusicInfo = useKeywordFilter(musicInfoList, keyword);
const sortedMusicInfo = useSortMusicInfoList(filteredMusicInfo, sortBy);

const pageSize = 12;
const {
  pageCount,
  paginatedData: paginatedMusicInfo,
} = usePagination({
  data: sortedMusicInfo,
  pageSize,
  page,
  deps: [keyword],
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
        <v-radio-group
          v-model="sortBy"
          class="ml-10"
          color="primary"
          inline
          hide-details
        >
          <div v-t="'global.sort_by_colon'" />
          <v-radio
            :label="$t('music.id')"
            value="Id"
          />
          <v-radio
            :label="$t('music_part.updated_at')"
            value="UpdatedAt"
          />
        </v-radio-group>
      </v-col>
      <v-col v-if="loading">
        <LoadingCircle />
      </v-col>
      <v-col
        v-for="music in paginatedMusicInfo"
        :key="music.Id"
        cols="6"
        md="4"
      >
        <v-card @click.stop="selectedMusicInfo = music; showDialog = true">
          <HwplMusicPartImageWithLogo
            :music-id="music.Id"
            :music-part-id="music.MusicParts[0].Id"
          />
          <v-card-title>
            {{ music.Song.Name }}
          </v-card-title>
          <v-card-subtitle class="pb-2">
            {{ music.Singer.Name }}
          </v-card-subtitle>
        </v-card>
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

    <v-dialog v-model="showDialog">
      <!-- FIXME(CSS): remove white margin-left and margin-right of the .v-card.v-container -->
      <v-card>
        <v-container>
          <v-row justify="center">
            <v-col
              v-for="musicPart in selectedMusicInfo?.MusicParts"
              :key="musicPart.Id"
              :cols="6"
              :md="selectedMusicInfo ? 12 / selectedMusicInfo.MusicParts.length : 12"
            >
              <v-card
                :to="{ name: 'Music Part Detail', params: { id: musicPart.Id } }"
              >
                <HwplMusicPartImageWithLogo
                  :music-id="musicPart.MusicId"
                  :music-part-id="musicPart.Id"
                />
                <v-card-title>
                  {{ musicPart.Name }}
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </AppScaffold>
</template>
