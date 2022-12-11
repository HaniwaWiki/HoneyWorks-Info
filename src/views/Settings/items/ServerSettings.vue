<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSettingsStore } from '../../../stores/settings';
import { SupportedServer, supportedServers } from '../../../utils/baseUrlList';
import { formatSize } from '../../../utils/files';
import { clearRequestCache, queryRequestCacheSize } from '../../../utils/request/cache';
import ButtonAction from '../../../components/base/ButtonAction.vue';

const { t } = useI18n();
const settingsStore = useSettingsStore();
const requestCacheSize = ref(t('...'));

async function updateRequestCacheSize() {
  requestCacheSize.value = formatSize(await queryRequestCacheSize());
}

async function clearRequestCacheAndRefresh() {
  requestCacheSize.value = '...';
  await clearRequestCache();
  await updateRequestCacheSize();
}

onMounted(updateRequestCacheSize);
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

  <ButtonAction
    class="mt-1"
    :on-click="clearRequestCacheAndRefresh"
  >
    {{ $t('settings.clear_server_cache') }} ({{ requestCacheSize }})
  </ButtonAction>
</template>
