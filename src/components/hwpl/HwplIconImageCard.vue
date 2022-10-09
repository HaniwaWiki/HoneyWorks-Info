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

type Props = {
  imgSrc: string;
  title?: string;
  subtitle?: string;
  // set rarity to 0 to hide rarity stars
  rarity?: number;
  // stars of evolved cards are colorful
  evolved?: boolean;
  // since icon are always 1:1, iconHeight === width
  width?: string;
  // if you want to align all cards, you can set all cards' height to the max possible one
  textHeight?: string;
};

withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  rarity: 0,
  evolved: false,
  width: '100px',
  textHeight: undefined,
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
