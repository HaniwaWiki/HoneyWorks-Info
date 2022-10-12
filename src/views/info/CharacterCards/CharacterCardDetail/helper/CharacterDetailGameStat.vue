<template>
  <v-card title="Game Statistics">
    <v-card-text>
      <div class="text-caption">Character Card Level</div>
      <v-slider
        v-model="selectedLevel"
        prepend-icon="mdi-star"
        thumb-label
        color="primary"
        :min="1"
        :max="maxLevelAfterEvolution"
        show-ticks="always"
        :step="1"
        :ticks="ticks"
      >
        <template #thumb-label="{ modelValue }">
          {{ getSliderLabel(modelValue) }}
        </template>
      </v-slider>
      <v-table>
        <thead>
          <tr>
            <th v-for="header in tableHeaders" :key="header">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="arr in tableData" :key="arr[0]">
            <td v-for="(item, i) in arr" :key="i">{{ item }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useCharacterCardName } from '@/composables/hwpl/useCharacterCardName';
import { CharacterCard } from '@/types/HWPL/CharacterCard';
import ButtonIconLink from '@/components/base/ButtonIconLink.vue';
import star from '@/assets/rarity_star_1.png';
import HwplTagGroup from '@/components/hwpl/HwplTag/HwplTagGroup.vue';
import { parseCharacterCardName } from '@/utils/hwpl/CharacterCard/common';
import { computed, ref } from 'vue';
import { useCollection } from '@/composables/useCollection';
import { CharacterCardOneLevelStat } from '@/types/HWPL/extra/CharacterCardLevelStat';

const props = defineProps<{
  characterCard: CharacterCard | null;
}>();
const { collection: characterCardLevelStat } = useCollection(
  'CharacterCardLevelStats'
);
const stats = computed(() =>
  characterCardLevelStat.value.find(
    (stat) => stat.CharacterCardId === props.characterCard?.Id
  )
);

const selectedLevel = ref(1);

// compute data for v-slider
const rarity = computed(() => props.characterCard?.Rarity ?? 0);
const maxLevel = computed(() => rarity.value * 10);
const maxLevelAfterEvolution = computed(() => rarity.value * 10 + 10);
const ticks = computed(() => ({
  [maxLevel.value]: maxLevel.value.toString(),
  [maxLevelAfterEvolution.value]: maxLevelAfterEvolution.value.toString(),
}));
function getSliderLabel(value: number) {
  switch (value) {
    case maxLevel.value:
      return `${value}(Max)`;
    case maxLevelAfterEvolution.value:
      return `${value}(Max+)`;
    default:
      return value;
  }
}

// compute data for v-table
const rank1Stat = computed(() => {
  const rankStat = stats.value?.Rank1 || [];
  rankStat.sort((a, b) => a.level - b.level);
  return rankStat;
});
const rank2Stat = computed(() => {
  const rankStat = stats.value?.Rank2 || [];
  rankStat.sort((a, b) => a.level - b.level);
  return rankStat;
});
const requireExpTotalList = computed(() => {
  const total = [0];
  for (const s of rank2Stat.value) {
    total.push(total[total.length - 1] + s.requireExp);
  }
  return total;
});
const tableHeaders = ['Name', 'Value', 'Value (Evolved)'];
const tableData = computed(() => {
  if (!stats.value) {
    return [[]];
  }

  const overflow1 = selectedLevel.value > maxLevel.value;
  const overflow1Or = <T>(value: T) => (overflow1 ? '/' : value);
  const {
    rythm: rythm1,
    technic: technic1,
    groove: groove1,
    requireExp: requireExp1,
  } = rank1Stat.value[selectedLevel.value - 1] || {};
  const {
    rythm: rythm2,
    technic: technic2,
    groove: groove2,
    requireExp: requireExp2,
  } = rank2Stat.value[selectedLevel.value - 1];
  const total1 = overflow1Or(rythm1 + technic1 + groove1);
  const total2 = rythm2 + technic2 + groove2;
  const requireExpTotal = requireExpTotalList.value[selectedLevel.value];
  return [
    ['Total', overflow1Or(total1), total2],
    ['Rythm', overflow1Or(rythm1), rythm2],
    ['Technic', overflow1Or(technic1), technic2],
    ['Groove', overflow1Or(groove1), groove2],
    ['Require Exp', overflow1Or(requireExp1), requireExp2],
    ['Require Exp (total)', overflow1Or(requireExpTotal), requireExpTotal],
  ];
});
</script>
