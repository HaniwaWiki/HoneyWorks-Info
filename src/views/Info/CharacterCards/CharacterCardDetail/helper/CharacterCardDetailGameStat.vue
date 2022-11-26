<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCharacterCardName } from '@/composables/hwpl/useCharacterCardName';
import type { CharacterCard } from '@/types/HWPL/CharacterCard';
import ButtonIconLink from '@/components/base/ButtonIconLink.vue';
import star from '@/assets/rarity_star_1.png';
import HwplTagGroup from '@/components/hwpl/HwplTag/HwplTagGroup.vue';
import { parseCharacterCardName } from '@/utils/hwpl/CharacterCard/common';
import { useCollection } from '@/composables/useCollection';
import { CharacterCardOneLevelStat } from '@/types/HWPL/extra/CharacterCardLevelStat';

const props = defineProps<{
  characterCard: CharacterCard | null;
}>();

const { t } = useI18n();

const { collection: characterCardLevelStat } = useCollection(
  'CharacterCardLevelStats',
);
const stats = computed(() =>
  characterCardLevelStat.value.find(
    stat => stat.CharacterCardId === props.characterCard?.Id,
  ),
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
const levelLabel = computed(() => {
  const level = selectedLevel.value;
  switch (level) {
    case maxLevel.value:
      return t('character_card.level_value_max', [level]);
    case maxLevelAfterEvolution.value:
      return t('character_card.level_value_max_evolved', [level]);
    default:
      return t('character_card.level_value', [level]);
  }
});

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
  for (const s of rank2Stat.value)
    total.push(total[total.length - 1] + s.requireExp);

  return total;
});

const tableHeaders = computed(() => [
  t('character_card.statistics_name'),
  t('character_card.statistics_value'),
  t('character_card.statistics_value_evolved'),
]);
const tableData = computed(() => {
  if (!stats.value)
    return [[]];

  const overflow1 = selectedLevel.value > maxLevel.value;
  function overflow1Or<T>(value: T) {
    return overflow1 ? '/' : value;
  }
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
    [t('character_card.statistics_total'), overflow1Or(total1), total2],
    [t('character_card.statistics_rythm'), overflow1Or(rythm1), rythm2],
    [t('character_card.statistics_technic'), overflow1Or(technic1), technic2],
    [t('character_card.statistics_groove'), overflow1Or(groove1), groove2],
    [
      t('character_card.statistics_require_exp'),
      overflow1Or(requireExp1),
      requireExp2,
    ],
    [
      t('character_card.statistics_require_exp_total'),
      overflow1Or(requireExpTotal),
      requireExpTotal,
    ],
  ];
});
</script>

<template>
  <v-card :title="$t('character_card.game_statistics')">
    <v-card-text>
      <div class="text-caption">
        <span v-t="'character_card.character_card_level'" class="mr-2" />
        <span>{{ levelLabel }}</span>
      </div>
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
      />
      <v-table>
        <thead>
          <tr>
            <th v-for="header in tableHeaders" :key="header">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="arr in tableData" :key="arr[0]">
            <td v-for="(item, i) in arr" :key="i">
              {{ item }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>
