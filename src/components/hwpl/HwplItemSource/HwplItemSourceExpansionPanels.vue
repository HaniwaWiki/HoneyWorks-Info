<script setup lang='ts'>
import { asyncComputed } from '@vueuse/core';
import HwplItemSourceGachaBoxes from './sources/HwplItemSourceGachaBoxes.vue';
import HwplItemSourceEventAchievementRewards from './sources/HwplItemSourceEventAchievementRewards.vue';
import { ItemSource } from '@/types/HWPL/extra/ItemSource';
import { getItemSource } from '@/api/getItemSource';

const props = defineProps<{ itemId: number; }>();

const itemSource = asyncComputed(() =>
  getItemSource(props.itemId)
, new ItemSource());
</script>

<template>
  <v-expansion-panels>
    <HwplItemSourceGachaBoxes
      v-if="itemSource.GachaBoxes.length > 0"
      :gacha-boxes="itemSource.GachaBoxes"
    />
    <HwplItemSourceEventAchievementRewards
      v-if="itemSource.EventAchievementRewards.length > 0"
      :events="itemSource.EventAchievementRewards"
    />
  </v-expansion-panels>
</template>
