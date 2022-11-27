<script setup lang='ts'>
import { ref } from 'vue';
import AppScaffold from '../../components/app/AppScaffold.vue';
import LanguageSettings from './items/LanguageSettings.vue';
import ServerSettings from './items/ServerSettings.vue';

const sizes = [
  '04', '06', '08', '10', '12', '14',
];
const selection = ref();
</script>

<template>
  <AppScaffold :title="$t('global.settings')">
    <v-card :title="$t('settings.language_and_server')">
      <v-card-text>
        <LanguageSettings />
      </v-card-text>
      <v-divider class="mx-4" />
      <v-card-text>
        <ServerSettings />
      </v-card-text>
    </v-card>
  </AppScaffold>
</template>
