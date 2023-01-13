<script setup lang="ts">
import type { Ref } from 'vue';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { GeriraInfo } from './helper/type';
import {
  useFetchGeriraList,
  useGeriraFilter,
} from './helper/useFetchGeriraList';
import { useNotificationOnNewGerira } from './helper/useNotificationOnNewGerira';
import type { DataTableHeader, DataTableSortBy } from '@/types/vuetify/v-data-table';
import { useCountDown } from '@/composables/useCountDown';
import AppScaffold from '@/components/app/AppScaffold/AppScaffold.vue';
import ButtonCopyToClipboard from '@/components/base/ButtonCopyToClipboard.vue';

// default CACHE_EXPIRE of RSSHub is 5 min
const countDown = 5 * 60;

const { t, d } = useI18n();

const { geriraList, loading, refresh } = useFetchGeriraList();
const aliveGeriraList = useGeriraFilter(geriraList);

const headers: Ref<DataTableHeader<GeriraInfo>[]> = computed(() => [
  {
    title: t('gerira_live_query.gerira_room_id'),
    key: 'roomId',
  },
  {
    title: t('gerira_live_query.gerira_level'),
    key: 'level',
  },
  {
    title: t('gerira_live_query.gerira_end_time'),
    key: 'endTime',
  },
]);
const sortBy = ref<DataTableSortBy<GeriraInfo>[]>([
  { key: 'level', order: 'desc' },
  { key: 'endTime', order: 'asc' },
]);

// use a count-down to auto refresh
const { count, resetCountDown } = useCountDown(countDown, (_resetCountDown) => {
  refresh();
  _resetCountDown(countDown);
});

// click button to manual fresh
function refreshGeriraInfoAndCountDown() {
  refresh();
  resetCountDown(countDown);
}

// send notification when new lv3 gerira is found
useNotificationOnNewGerira(aliveGeriraList, 3);
</script>

<template>
  <AppScaffold>
    <v-row>
      <v-col align-self="end">
        <v-btn
          color="primary"
          prepend-icon="mdi-refresh"
          :loading="loading"
          :disabled="loading"
          @click="refreshGeriraInfoAndCountDown"
        >
          {{ `${t('gerira_live_query.refresh')} (${count})` }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <VDataTable
            v-model:sortBy="sortBy"
            :headers="headers"
            :items="aliveGeriraList"
            :items-per-page="15"
            multi-sort
          >
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.roomId="{ item }">
              <ButtonCopyToClipboard :content="item.value.roomId" />
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.endTime="{ item }">
              {{ d(item.value.endTime, 'short') }}
            </template>
          </VDataTable>
        </v-card>
      </v-col>
    </v-row>
  </AppScaffold>
</template>
