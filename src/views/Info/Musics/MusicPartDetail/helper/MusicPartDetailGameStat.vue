<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import type { MusicPart } from '@/types/HWPL/MusicPart';
import type { Music } from '@/types/HWPL/Music';
import type { Song } from '@/types/HWPL/Song';
import type { Singer } from '@/types/HWPL/Singer';
import type { MusicalScore } from '@/types/HWPL/MusicalScore';
import HwplMusicPartRankChip from '@/components/hwpl/HwplMusicPartRankChip.vue';
import { useCharacterCardName } from '@/composables/hwpl/useCharacterCardName';
import type { CharacterCard } from '@/types/HWPL/CharacterCard';
import ButtonIconLink from '@/components/base/ButtonIconLink.vue';
import HwplTagGroup from '@/components/hwpl/HwplTag/HwplTagGroup.vue';
import { parseCharacterCardName } from '@/utils/hwpl/CharacterCard/common';
import { useCollection } from '@/composables/useCollection';
import { CharacterCardOneLevelStat } from '@/types/HWPL/extra/CharacterCardLevelStat';

const props = defineProps<{
  musicPart: MusicPart | null;
  musicalScores: MusicalScore[];
}>();

const { musicPart, musicalScores } = toRefs(props);

const { t } = useI18n();

const tableHeaders = computed(() => [
  t('music_part.rank'),
  t('music_part.play_level'),
  'More...',
]);
const tableData = computed(() => {
  const ranks = [1, 2, 3, 4];
  const filteredMusicalScores = ranks
    .map(rank => musicalScores.value.find(
      score => score.MusicPartId === musicPart.value?.Id && score.Rank === rank,
    ));
  return filteredMusicalScores.map(score => [score?.PlayLevel, '']);
});
</script>

<template>
  <v-card :title="$t('music_part.game_statistics')">
    <v-card-text>
      <v-table>
        <thead>
          <tr>
            <th v-for="header in tableHeaders" :key="header">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(arr, i) in tableData" :key="arr[0]">
            <!-- the first column is rank -->
            <td>
              <HwplMusicPartRankChip :rank="i + 1" />
            </td>
            <td v-for="(item, j) in arr" :key="j">
              {{ item }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>
