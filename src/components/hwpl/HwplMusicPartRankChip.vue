<script setup lang='ts'>
defineProps<{
  rank: 1 | 2 | 3 | 4 | number;
}>();

const rankColorMap: { [rank: number]: string; } = {
  1: '#6ac9d9',
  2: '#65cb59',
  3: '#f7ca76',
  4: '#ee5387',
};
const rankTextMap: { [rank: number]: string; } = {
  1: 'EASY',
  2: 'NORMAL',
  3: 'HARD',
  4: 'EXPERT',
};
</script>

<template>
  <v-chip
    size="small"
    variant="elevated"
    elevation="0"
    :color="rankColorMap[rank]"
    class="text-white"
  >
    {{ rankTextMap[rank] }}
  </v-chip>
</template>
