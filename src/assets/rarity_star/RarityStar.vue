<script setup lang='ts'>
import { computed } from 'vue';
import star_1 from './rarity_star_1.png';
import star_2 from './rarity_star_2.png';

type Props = { evolved?: boolean; };

const props = withDefaults(defineProps<Props>(), { evolved: false });

const imgSrc = computed(() => props.evolved ? star_2 : star_1);
</script>

<template>
  <v-img :src="imgSrc" :aspect-ratio="1" />
</template>
