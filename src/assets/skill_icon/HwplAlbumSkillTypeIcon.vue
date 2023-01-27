<script setup lang="ts">
import { computed } from 'vue';
import skill_icon_1 from './icons/1.png';
import skill_icon_2 from './icons/2.png';
import skill_icon_3 from './icons/3.png';
import skill_icon_32 from './icons/32.png';
import skill_icon_40 from './icons/40.png';
import type { Skill } from '@/types/HWPL/Skill';

type Props = {
  skillType: Skill;
  width?: string;
};

const props = withDefaults(defineProps<Props>(), {
  width: '16px',
});

const imgSrc = computed(() => {
  const lst = [];
  if (props.skillType.Class === 1 || props.skillType.Class === 90) {
    if (
      parseFloat(props.skillType.Arg1) > 0
      || parseFloat(props.skillType.Arg2) > 0
    )
      lst.push(skill_icon_1);

    if (
      parseFloat(props.skillType.Arg3) > 0
      || parseFloat(props.skillType.Arg4) > 0
    )
      lst.push(skill_icon_2);

    if (
      parseFloat(props.skillType.Arg5) > 0
      || parseFloat(props.skillType.Arg6) > 0
    )
      lst.push(skill_icon_3);
  }
  else if (props.skillType.Class === 32) {
    lst.push(skill_icon_32);
  }
  else if (props.skillType.Class === 40) {
    lst.push(skill_icon_40);
  }
  return lst;
});
</script>

<template>
  <v-img
    v-for="(item, i) in imgSrc"
    :key="i"
    :value="item"
    :src="item"
    :aspect-ratio="1"
    :width="width"
  />
</template>
