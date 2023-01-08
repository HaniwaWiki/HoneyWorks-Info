<script setup lang="ts">
import { useAboutUsReadme } from './helper/useAboutUsReadme';
import AppScaffold from '@/components/app/AppScaffold/AppScaffold.vue';

const readme = useAboutUsReadme();
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
        <component :is="readme" />
      </v-col>
    </v-row>
  </AppScaffold>
</template>
