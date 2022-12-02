<script setup lang='ts'>
import { useSettingsStore } from '../../../stores/settings';
import { SupportedServer, supportedServers } from '../../../utils/baseUrlList';

const settingsStore = useSettingsStore();
</script>

<template>
  <span>
    <v-icon size="small" icon="mdi-server" class="mr-1" />
    <span v-t="'settings.server'" />
  </span>

  <v-chip-group
    :model-value="settingsStore.server"
    :color="settingsStore.primaryColor"
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
