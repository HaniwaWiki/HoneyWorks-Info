<script setup lang='ts'>
import { getMusicLogoUrl, getMusicPartTitleImageUrl } from '../../utils/hwpl/MusicPart/url';

const props = defineProps<{
  musicId: number;
  musicPartId: number;
}>();
</script>

<template>
  <div class="position-relative">
    <v-img
      :src="getMusicPartTitleImageUrl({ Id: musicPartId })"
      :aspect-ratio="16 / 9"
    />
    <img
      class="music-logo"
      :src="getMusicLogoUrl(musicId)"
      :alt="musicId.toString()"
    >
  </div>
</template>

<style lang='scss'>
.music-logo {
  position: absolute;
  bottom: 2%;
  left: 2%;
  max-width: 50%;
  max-height: 50%;
  object-fit: contain;
}
</style>
