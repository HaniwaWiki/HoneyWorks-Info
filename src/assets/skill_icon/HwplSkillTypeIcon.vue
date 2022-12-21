<script setup lang='ts'>
import { computed } from 'vue';
import type { Skill } from '../../types/HWPL/Skill';
import skill_icon_11 from './icons/11.png';
import skill_icon_21 from './icons/21.png';
import skill_icon_31 from './icons/31.png';
import skill_icon_41 from './icons/41.png';
import skill_icon_42 from './icons/42.png';

type Props = {
  skillType: Skill['Class'];
  width?: string;
};

const props = withDefaults(defineProps<Props>(), {
  width: '16px',
});

const imgSrc = computed(() => {
  switch (props.skillType) {
    case 11:
      return skill_icon_11;
    case 21:
      return skill_icon_21;
    case 31:
      return skill_icon_31;
    case 41:
      return skill_icon_41;
    case 42:
      return skill_icon_42;
    default:
      return '';
  }
});
</script>

<template>
  <v-img :src="imgSrc" :aspect-ratio="1" :width="width" />
</template>
