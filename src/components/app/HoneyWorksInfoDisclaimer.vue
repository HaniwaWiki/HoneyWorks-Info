<script setup lang='ts'>
import { useSettingsStore } from '@/stores/settings';

const settingsStore = useSettingsStore();
</script>

<template>
  <v-alert
    :model-value="!settingsStore.settings.hideDisclaimer"
    :text="$t('disclaimer.content')"
    type="warning"
    closable
    variant="outlined"
    @update:model-value="(val: boolean) => settingsStore.setHideDisclaimer(!val)"
  />
</template>
