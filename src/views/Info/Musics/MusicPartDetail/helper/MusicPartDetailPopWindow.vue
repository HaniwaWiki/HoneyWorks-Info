<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  ref,
  toRefs,
  watch,
  watchEffect,
} from 'vue';
import { useI18n } from 'vue-i18n';
import {
  helperChangeLine,
  helperChangeSpeed,
  useGenerateSongChart,
} from './useGenerateSongChat';
import type { MusicPart } from '@/types/HWPL/MusicPart';
import type { MusicalScore } from '@/types/HWPL/MusicalScore';
import HwplMusicPartRankChip from '@/components/hwpl/HwplMusicPartRankChip.vue';

const props = defineProps<{
  musicPart: MusicPart | null;
  musicalScores: MusicalScore[];
}>();
// need to finish
const { t } = useI18n();
const { musicPart, musicalScores } = toRefs(props);

const ranks = [1, 2, 3, 4];
const tableData = computed(() => {
  const filteredMusicalScores = ranks.map(rank =>
    musicalScores.value.find(
      score =>
        score.MusicPartId === musicPart.value?.Id && score.Rank === rank,
    ),
  );
  return filteredMusicalScores.map(
    score => [score?.MusicTime, score?.EncodedNotes] as [number, string],
  );
});

let songChartList = useGenerateSongChart(tableData);
const tab = ref<number>(0);

async function renderSongChart() {
  await nextTick();
  for (const index in ranks) {
    const rank = ranks[index];
    const songChart = songChartList.value[index];
    const containerId = `song-chart-rank-${rank}`;
    const containerElement = document.getElementById(containerId);
    if (containerElement == null)
      continue;

    containerElement.innerHTML = '';
    for (const canvas of songChart)
      containerElement.appendChild(canvas);
  }
}

const values = ref<number>(150);
function changeSpeed() {
  helperChangeSpeed(values.value);
  songChartList = useGenerateSongChart(tableData);
}

const line = ref<boolean>(true);
function changeLine() {
  helperChangeLine(line.value);
  songChartList = useGenerateSongChart(tableData);
}
watch(values, changeSpeed);
watch(line, changeLine);
onMounted(renderSongChart);
watch([tab, songChartList, values, line], renderSongChart);

const showsSetting = ref<boolean>(false);
</script>

<template>
  <v-card :title="$t('music_part.song_note')">
    <v-btn
      class="ma-2"
      outlined
      color="indigo"
      @click="showsSetting = !showsSetting"
    >
      <v-icon>mdi-cog-outline </v-icon>
    </v-btn>

    <v-card v-if="showsSetting">
      <v-list lines="three" subheader>
        <v-list-item title="Note Size">
          <v-slider v-model="values" step="20" max="300" min="100" />
        </v-list-item>

        <v-list-item title="Dual Line">
          <v-btn-toggle v-model="line">
            <v-btn depressed value="left" @click="line = true">
              Show Line
            </v-btn>

            <v-btn value="center" @click="line = false">
              Not Show Line
            </v-btn>
          </v-btn-toggle>
        </v-list-item>
      </v-list>
    </v-card>
    <div />
    <v-tabs v-model="tab" color="primary" center-active>
      <v-tab v-for="(rank, index) in ranks" :key="index">
        <HwplMusicPartRankChip :rank="rank" />
      </v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item v-for="(rank) in ranks" :key="rank">
        <v-container>
          <div :id="`song-chart-rank-${rank}`" class="d-flex overflow-auto" />
        </v-container>
      </v-window-item>
    </v-window>

    <!-- setting -->
  </v-card>
</template>

<style>
.my-custom-class {
  background-color: black;
}
</style>
