<template>
  <!-- container, row and col can limit card's position -->
  <v-container>
    <v-row justify="center">
      <v-col v-bind="$props">
        <slot />
      </v-col>
    </v-row>
  </v-container>
  <div :style="{ height: placeholderHeight }" />
</template>

<script setup lang="ts">
import { vuetifyColsDefault, VuetifyColsProps } from '@/types/vuetify/col';

// Vue 3.2 currently doesn't support complex type in defineProps
// so the following is a workaround
// related issue: https://github.com/vuejs/core/issues/4294

/* eslint-disable vue/require-default-prop */
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
  placeholderHeight?: string;
};

withDefaults(defineProps<Props>(), {
  ...vuetifyColsDefault,
  title: '',
  placeholderHeight: '100px',
});
</script>
