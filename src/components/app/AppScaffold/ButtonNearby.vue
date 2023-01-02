<script setup lang='ts'>
import type { RouteLocationRaw } from 'vue-router';
import { computed } from 'vue';
import { scrollToTop } from '@/utils/scrollTo';

const props = defineProps<{
  type: 'prev' | 'next';
  title?: string;
  to?: RouteLocationRaw;
}>();

const VBtnIconProps = computed(() =>
  props.type === 'prev'
    ? { prependIcon: 'mdi-arrow-left' }
    : { appendIcon: 'mdi-arrow-right' },
);

function scrollToTopInNewPage() {
  setTimeout(scrollToTop, 100);
}
</script>

<template>
  <v-btn
    variant="text"
    height="unset"
    min-height="36px"
    block
    :to="to"
    v-bind="VBtnIconProps"
    @click="scrollToTopInNewPage"
  >
    <div class="button-text-multiline">
      {{ title }}
    </div>
  </v-btn>
</template>

<style lang='scss' scoped>
.button-text-multiline {
  overflow: hidden;
  text-align: center;
  white-space: normal;
}
</style>
