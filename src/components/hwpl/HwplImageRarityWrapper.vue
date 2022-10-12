<!-- wrapper of character cards image, and add rarity star onto the image  -->
<template>
  <div style="position: relative">
    <slot />
    <img
      v-for="left in leftPositionArray"
      :key="left"
      :src="evolved ? starEvolved : star"
      alt="star"
      :style="{
        position: 'absolute',
        width: '15%',
        bottom: '5%',
        left: `${left}%`,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import star from '@/assets/rarity_star_1.png';
import starEvolved from '@/assets/rarity_star_2.png';
import { computed } from 'vue';

type Props = { rarity?: number; evolved?: boolean };

const props = withDefaults(defineProps<Props>(), {
  rarity: 0,
  evolved: false,
});

const leftPositionArray = computed(() =>
  Array(props.rarity)
    .fill(0)
    .map((_, i) => 15 * i + 5)
);
</script>

<style lang="scss" scoped></style>
