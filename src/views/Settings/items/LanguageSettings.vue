<script setup lang='ts'>
import { localeConfigs } from '@/i18n/config';
import { useSettingsStore } from '@/stores/settings';
import { SupportedLocale } from '@/types/i18n';

const settingsStore = useSettingsStore();
</script>

<template>
  <span>
    <v-icon size="small" icon="mdi-translate" class="mr-1" />
    <span v-t="'settings.language'" />
  </span>

  <v-chip-group
    :model-value="settingsStore.settings.locale"
    :color="settingsStore.primaryColor"
    mandatory
    @update:model-value="(locale: string) => settingsStore.setLocale(locale)"
  >
    <v-chip
      v-for="localeConfig in localeConfigs"
      :key="localeConfig.id"
      :value="localeConfig.id"
    >
      {{ localeConfig.name }}
    </v-chip>
  </v-chip-group>
</template>
@/i18n/config
