<template>
  <!-- container, row and col can limit card's position -->
  <v-container>
    <v-row class="justify-center">
      <v-col :cols="cols" :md="md">
        <v-row>
          <v-col>
            <PageTitle :title="title" class="mb-2" />
          </v-col>
        </v-row>
        <slot />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import PageTitle from '@/components/base/PageTitle.vue';
import { defaultCols, defaultMdCols } from './config';

defineProps({
  // columns on mobile
  cols: {
    type: [Number, String],
    default: defaultCols,
  },
  // columns on desktop
  md: {
    type: [Number, String],
    default: defaultMdCols,
  },
  title: {
    type: String,
    default: undefined,
  },
});
</script>
