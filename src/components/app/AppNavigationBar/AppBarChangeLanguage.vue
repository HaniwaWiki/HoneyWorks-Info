<script setup lang="ts">
import { useSettingsStore } from '../../../stores/settings';
import { supportedLocaleMap, supportedLocales } from '@/i18n/supportedLocales';

const settingsStore = useSettingsStore();
</script>

<template>
  <v-menu>
    <template #activator="{ props }">
      <v-app-bar-nav-icon icon="mdi-translate" v-bind="props" />
    </template>
    <v-list>
      <!--
      fixme: show user current choice.
        current version is not working, since Vuetify docs are unclear on v-item-group
      -->
      <v-item-group v-model="settingsStore.locale" selected-class="text-primary">
        <v-list-item
          v-for="locale in supportedLocales"
          :key="locale"
          :value="locale"
          density="comfortable"
        >
          <v-list-item-title @click="settingsStore.setLocale(locale)">
            {{ supportedLocaleMap[locale] }}
          </v-list-item-title>
        </v-list-item>
      </v-item-group>
    </v-list>
  </v-menu>
</template>
