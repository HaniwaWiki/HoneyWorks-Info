<template>
  <audio
    v-if="url"
    :autoplay="autoplay"
    :loop="loop"
    :muted="muted"
    :controls="controls"
  >
    <source :src="url" />
  </audio>
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
audio {
  display: block;
  margin: 5vh auto;
  width: 80%;
  max-height: 100%;
}
</style>
