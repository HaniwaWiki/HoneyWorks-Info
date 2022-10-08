<template>
  <!-- container, row and col can limit card's position -->
  <v-container>
    <v-row class="justify-center">
      <v-col v-bind="$props">
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
import { vuetifyColProps } from '@/types/vuetify/col';

defineProps({
  ...vuetifyColProps,
  title: {
    type: String,
    default: undefined,
  },
});
</script>
