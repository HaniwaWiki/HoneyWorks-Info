<template>
  <video
    v-if="url"
    :autoplay="autoplay"
    :loop="loop"
    :muted="muted"
    :controls="controls"
  >
    <source :src="url" type="video/mp4" />
  </video>
</template>

<script setup lang="ts">
defineProps<{
  url: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}>();
</script>

<style lang="scss" scoped>
video {
  display: block;
  width: 100%;
  max-height: 100%;
}
</style>
