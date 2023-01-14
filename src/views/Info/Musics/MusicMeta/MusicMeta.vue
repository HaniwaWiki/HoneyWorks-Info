<script setup lang="ts">
import type { Ref, UnwrapRef } from 'vue';
import { computed, ref } from 'vue';
import { VDataTable } from 'vuetify/lib/labs/VDataTable/index';
import { useI18n } from 'vue-i18n';
import type { ElementOf } from '@vueuse/core';
import AppScaffold from '@/components/app/AppScaffold/AppScaffold.vue';
import ButtonIconLink from '@/components/base/ButtonIconLink.vue';
import HwplMusicPartRankChip from '@/components/hwpl/HwplMusicPartRankChip.vue';
import { useMusicalScoreInfoList } from '@/composables/hwpl/useMusicalScoreInfoList';
import type { DataTableHeader } from '@/types/vuetify/v-data-table';

const { t } = useI18n();

const search = ref('');

const { loading, musicalScoreInfoList } = useMusicalScoreInfoList();

const rankTextMap: Record<number, string> = {
  1: 'EASY',
  2: 'NORMAL',
  3: 'HARD',
  4: 'EXPERT',
};

const musicalScoreData = computed(() => musicalScoreInfoList.value.map(({ Music, Singer, Song, MusicPart, ...MusicalScore }) => ({
  musicName: Song.Name,
  musicPartId: MusicPart.Id,
  musicPartName: MusicPart.Name,
  rank: MusicalScore.Rank,
  rankText: rankTextMap[MusicalScore.Rank],
  playLevel: MusicalScore.PlayLevel,
  musicTime: MusicalScore.MusicTime,
})));

type MusicalScoreData = ElementOf<UnwrapRef<typeof musicalScoreData>>;

const headers: Ref<DataTableHeader<MusicalScoreData>[]> = computed(() => [
  {
    title: t('music_meta.music_name'),
    key: 'musicName',
    width: '20%' as unknown as number,
  },
  {
    title: t('music_meta.part_name'),
    key: 'musicPartName',
    width: '15%' as unknown as number,
  },
  {
    title: t('music_meta.difficulty'),
    key: 'rankText',
    width: '15%' as unknown as number,
    sort: (a: string, b: string) => {
      const textRankMap: Record<string, number> = {
        EASY: 1,
        NORMAL: 2,
        HARD: 3,
        EXPERT: 4,
      };
      return textRankMap[a] - textRankMap[b];
    },
  },
  {
    title: t('music_meta.level'),
    key: 'playLevel',
    width: '10%' as unknown as number,
  },
  {
    title: t('music_meta.time_seconds'),
    key: 'musicTime',
    width: '10%' as unknown as number,
  },
]);
</script>

<template>
  <AppScaffold md="10">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="4" align-self="end">
            <div v-t="'global.music_meta'" />
          </v-col>
          <v-col cols="6" offset="2">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              :label="$t('global.search')"
              variant="underlined"
              single-line
              hide-details
            />
          </v-col>
        </v-row>
      </v-card-title>
      <VDataTable
        :loading="loading"
        :headers="headers"
        :items="musicalScoreData"
        :search="search"
        :items-per-page="15"
        multi-sort
      >
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.musicPartName="{ item }">
          {{ item.value.musicPartName }}
          <ButtonIconLink
            size="x-small"
            color="primary"
            :to="{
              name: 'Music Part Detail',
              params: { id: item.value.musicPartId },
            }"
          />
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.rankText="{ item }">
          <HwplMusicPartRankChip :rank="item.value.rank" />
        </template>
      </VDataTable>
    </v-card>
  </AppScaffold>
</template>
