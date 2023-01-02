<script setup lang="ts">
import AppScaffold from '@/components/app/AppScaffold/AppScaffold.vue';
</script>

<template>
  <!-- container, row and col can limit card's position -->
  <AppScaffold>
    <v-row
      class="justify-center"
    >
      <v-col>
        <!-- BE CAREFUL ABOUT XSS if you want to use Weblate to translate -->
        <!-- so we decide to hard code the text into website -->

        <!-- TODO: support md. currently vite-plugin-md is not working -->
        <!-- see https://github.com/antfu/vite-plugin-md/issues/123 -->
        To do
      </v-col>
    </v-row>
  </AppScaffold>
</template>
