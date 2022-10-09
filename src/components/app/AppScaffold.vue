<template>
  <!-- container, row and col can limit card's position -->
  <v-container>
    <v-row class="justify-center">
      <v-col v-bind="$props">
        <slot />
      </v-col>
    </v-row>
  </v-container>
  <div :style="{ height: placeholderHeight }" />
</template>

<script setup lang="ts">
import { vuetifyColsDefault, VuetifyColsProps } from '@/types/vuetify/col';

type Props = VuetifyColsProps & {
  title?: string;
  placeholderHeight?: string;
};

withDefaults(defineProps<Props>(), {
  ...vuetifyColsDefault,
  title: '',
  placeholderHeight: '100px',
});
</script>
