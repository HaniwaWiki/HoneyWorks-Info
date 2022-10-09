<template>
  <v-card ripple class="hwpl-icon" :width="width">
    <HwplImageRarityWrapper :rarity="rarity" :evolved="evolved">
      <v-img :src="imgSrc" :alt="title" class="ma-auto" :aspect-ratio="1" />
    </HwplImageRarityWrapper>

    <v-card-text
      v-if="title || subtitle"
      class="icon-card-textarea"
      :style="{ height: textHeight }"
    >
      <div class="icon-card-title">{{ title }}</div>
      <div class="text-grey icon-card-subtitle">
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
  // stars of evolved cards are colorful
  evolved: {
    type: Boolean,
    default: false,
  },
  // since icon are always 1:1, iconHeight === width
  width: {
    type: String,
    default: '100px',
  },
  // if you want to align all cards, you can set all cards' height to the max possible one
  textHeight: {
    type: String,
    default: undefined,
  },
});
</script>

<style lang="scss" scoped>
.icon-card {
  &-textarea {
    // horizontal align title and subtitle
    text-align: center;
    white-space: pre-wrap;

    // vertical align title and subtitle
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &-title {
    font-size: 0.75rem;
    line-height: 18px;
  }

  &-subtitle {
    font-size: 0.75rem;
  }
}
</style>
