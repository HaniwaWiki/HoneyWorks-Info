<script setup lang='ts'>
import { useSettingsStore } from '../../../stores/settings';
import { SupportedLocale, supportedLocaleMap, supportedLocales } from '../../../i18n/supportedLocales';
const settingsStore = useSettingsStore();
</script>

<template>
  <span v-t="'settings.language'" class="subheading" />

  <v-chip-group
    :model-value="settingsStore.locale"
    selected-class="text-deep-purple-accent-4"
    mandatory
    @update:model-value="(val:SupportedLocale) => settingsStore.setLocale(val)"
  >
    <v-chip
      v-for="locale in supportedLocales"
      :key="locale"
      :value="locale"
    >
      {{ supportedLocaleMap[locale] }}
    </v-chip>
  </v-chip-group>
</template>
