<script setup lang="ts">
import { vuetifyColsDefault } from '@/types/vuetify/col';

// Vue 3.2 currently doesn't support complex type in defineProps
// so the following is a workaround
// related issue: https://github.com/vuejs/core/issues/4294

// type Props = VuetifyColsProps & {
type Props = {
  // columns on common mobile (default)
  cols?: number | string;
  sm?: number | string;
  // columns on common desktop (>= md)
  md?: number | string;
  lg?: number | string;
  xl?: number | string;

  title?: string;
  subtitle?: string;

  // height of white space at page bottom
  // so that user scroll bottom content of the page to near center of the screen
  placeholderHeight?: string;
};

withDefaults(defineProps<Props>(), {
  ...vuetifyColsDefault,
  placeholderHeight: '10vh',
});
</script>

<template>
  <!-- container, row and col can limit card's position -->
  <v-container>
    <v-row justify="center">
      <v-col v-bind="$props" class="app-scaffold">
        <div v-if="title" class="text-h3 mb-2 text-overflow-ellipsis-on-two-lines">
          {{ title }}
        </div>
        <div v-if="subtitle" class="text-h5 text-grey text-overflow-ellipsis-on-two-lines">
          {{ subtitle }}
        </div>
        <slot />
      </v-col>
    </v-row>
  </v-container>
  <div :style="{ height: placeholderHeight }" />
</template>

<style lang="scss" scoped>
// cards in app scaffold will have a 40px margin on y axis ("my-8")
.app-scaffold {
  & > :deep(.v-card) {
    margin-top: 64px;
    margin-bottom: 64px;
  }
}
</style>