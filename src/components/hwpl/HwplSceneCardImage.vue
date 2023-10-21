<script setup lang="ts">
import { asyncComputed } from '@vueuse/core';
import { getSceneCardImageUrls } from '@/utils/hwpl/SceneCard/url';
// import { onMounted, onServerPrefetch } from "vue";

const props = defineProps<{
  sceneId: number;
  name: string;
}>();
const titleFontSize = '15px';
const cardUrl = asyncComputed(async () => {
  const { static_full } = await getSceneCardImageUrls(props.sceneId);
  return static_full;
});

const cardName = props.name;
const cardId = props.sceneId;
</script>

<template>
  <v-card :to="{ name: 'Scene Card Detail', params: { id: cardId } }">
    <div class="position-relative">
      <v-img :src="cardUrl" :aspect-ratio="16 / 9" />
    </div>
    <v-card-title :style="{ fontSize: titleFontSize }">
      {{ cardName }}
    </v-card-title>
  </v-card>
</template>
