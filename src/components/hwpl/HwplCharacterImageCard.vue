<template>
  <v-card ripple :width="width">
    <HwplImageRarityWrapper :rarity="rarity" :evolved="evolved">
      <v-img
        :src="imgSrc"
        :alt="title"
        class="ma-auto"
        :aspect-ratio="1 / 1.5"
      />
    </HwplImageRarityWrapper>

    <v-card-text
      v-if="title || subtitle"
      class="character-card-textarea"
      :style="{ height: textHeight }"
    >
      <div>{{ title }}</div>
      <div class="text-grey character-card-subtitle">
        {{ subtitle }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import HwplImageRarityWrapper from '@/components/hwpl/HwplImageRarityWrapper.vue';

defineProps({
  imgSrc: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  // set rarity to 0 to hide rarity stars
  rarity: {
    type: Number,
    default: 0,
  },
  // evolved cards' stars are colorful
  evolved: {
    type: Boolean,
    default: false,
  },
  // since aspect-ratio of images are constant , textHeight === width * 1.5
  width: {
    type: String,
    default: undefined,
  },
  // if you want to align all cards, you may need to set all cards' height to the max possible one
  textHeight: {
    type: String,
    default: undefined,
  },
});
</script>

<style lang="scss" scoped>
.character-card {
  &-textarea {
    // horizontal align title and subtitle
    text-align: center;
    white-space: pre-wrap;

    // vertical align title and subtitle
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &-subtitle {
    font-size: 0.75rem;
  }
}
</style>
