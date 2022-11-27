<script setup lang='ts'>
import { useSettingsStore } from '../../../stores/settings';
import { SupportedServer, supportedServers } from '../../../utils/baseUrlList';

const settingsStore = useSettingsStore();
</script>

<template>
  <span v-t="'settings.server'" class="subheading" />

  <v-chip-group
    :model-value="settingsStore.server"
    selected-class="text-deep-purple-accent-4"
    mandatory
    @update:model-value="(val: SupportedServer) => settingsStore.setServer(val)"
  >
    <v-chip
      v-for="server in supportedServers"
      :key="server"
      :value="server"
    >
      {{ $t(`settings.server_list.${server}`) }}
    </v-chip>
  </v-chip-group>
</template>
