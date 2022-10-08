<template>
  <!-- container, row and col can limit card's position -->
  <v-container>
    <v-row class="justify-center">
      <v-col v-bind="$props">
        <slot />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { vuetifyColProps } from '@/types/vuetify/col';

defineProps({
  ...vuetifyColProps,
  title: {
    type: String,
    default: undefined,
  },
});
</script>
