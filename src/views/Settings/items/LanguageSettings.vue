<script setup lang='ts'>
import { useSettingsStore } from '../../../stores/settings';
import { SupportedLocale, supportedLocaleMap, supportedLocales } from '../../../i18n/supportedLocales';
const settingsStore = useSettingsStore();
</script>

<template>
  <span>
    <v-icon size="small" icon="mdi-translate" class="mr-1" />
    <span v-t="'settings.language'" />
  </span>

  <v-chip-group
    :model-value="settingsStore.locale"
    :color="settingsStore.primaryColor"
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
