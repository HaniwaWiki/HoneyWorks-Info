<script setup lang='ts'>
import HwplItemSourceGachaBoxes from './sources/HwplItemSourceGachaBoxes.vue';
import HwplItemSourceEventAchievementRewards from './sources/HwplItemSourceEventAchievementRewards.vue';
import type { ItemSource } from '@/types/HWPL/extra/ItemSource';
import { getItemSource } from '@/api/getItemSource';
import asyncComputed from '@/utils/asyncComputed';

const props = defineProps<{ itemId: number; }>();

const itemSource = asyncComputed(() =>
  getItemSource(props.itemId)
, {} as ItemSource);
</script>

<template>
  <v-expansion-panels>
    <HwplItemSourceGachaBoxes
      v-if="itemSource.GachaBoxes"
      :gacha-boxes="itemSource.GachaBoxes"
    />
    <HwplItemSourceEventAchievementRewards
      v-if="itemSource.EventAchievementRewards"
      :events="itemSource.EventAchievementRewards"
    />
  </v-expansion-panels>
</template>
