<template>
  <video
    v-if="url"
    :autoplay="autoplay"
    :loop="loop"
    :muted="muted"
    :controls="controls"
    :width="width"
    :height="height"
  >
    <source :src="url" />
  </video>
</template>

<script setup lang="ts">
defineProps<{
  url: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  width?: string;
  height?: string;
}>();
</script>

<style lang="scss" scoped>
video {
  display: block;
  width: 100%;
  max-height: 100%;
}
</style>
