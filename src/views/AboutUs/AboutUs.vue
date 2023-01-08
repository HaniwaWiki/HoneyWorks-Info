<script setup lang="ts">
import { useAboutUsMarkdown } from './helper/useAboutUsReadme';
import AppScaffold from '@/components/app/AppScaffold/AppScaffold.vue';

const aboutUs = useAboutUsMarkdown();
</script>

<template>
  <!-- container, row and col can limit card's position -->
  <AppScaffold>
    <v-row class="justify-center">
      <v-col>
        <!-- BE CAREFUL ABOUT XSS if you want to use Weblate to translate -->
        <!-- so we decide to hard code the text into website -->
        <component :is="aboutUs" />
      </v-col>
    </v-row>
  </AppScaffold>
</template>
