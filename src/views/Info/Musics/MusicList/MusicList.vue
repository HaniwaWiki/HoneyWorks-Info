<script setup lang="ts">
import { ref } from 'vue';
import type { SortBy } from '../../CharacterCards/CharacterCardList/helper/useSortCharacterCards';
import { getMusicPartTitleImageUrl } from '../../../../utils/hwpl/MusicPart/url';
import type { MusicInfo } from '../helper/useMusicInfo';
import { useMusicInfo } from '../helper/useMusicInfo';
import AppScaffold from '@/components/app/AppScaffold.vue';
import { usePagination } from '@/composables/usePagination';
import { useKeywordFilter } from '@/composables/useKeywordFilter';

// options from user
const keyword = ref('');
const sortBy = ref<SortBy>('Default');
const selectedMusicInfo = ref<MusicInfo | undefined>(undefined);
// use selectedMusicInfo to compute showDialog will cause UI bug
const showDialog = ref(false);

// fetch, filter and paginate data
const { loading, musicInfo } = useMusicInfo();
const filteredMusicInfo = useKeywordFilter(musicInfo, keyword);

const pageSize = 12;
const {
  pageCount,
  page,
  paginatedData: paginatedMusicInfo,
} = usePagination(filteredMusicInfo, pageSize);

function getMusicPartImage(Id: number) {
  return getMusicPartTitleImageUrl({ Id, thumb: false });
}
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
      <v-col v-if="loading" class="text-center">
        <v-progress-circular indeterminate color="primary" />
      </v-col>
      <v-col
        v-for="music in paginatedMusicInfo"
        :key="music.Id"
        cols="6"
        md="4"
      >
        <v-card @click.stop="selectedMusicInfo = music; showDialog = true">
          <v-img :src="getMusicPartImage(music.MusicParts[0].Id)" :aspect-ratio="16 / 9" />
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

    <v-dialog
      v-model="showDialog"
    >
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
                <v-img :src="getMusicPartImage(musicPart.Id)" :aspect-ratio="16 / 9" />
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
