<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import AppScaffold from '../../../components/app/AppScaffold.vue';
import { useCountDown } from '../../../composables/useCountDown';
import CopyToClipboard from '../../../components/base/CopyToClipboard.vue';
import {
  useFetchGeriraList,
  useGeriraFilter,
} from './helper/useFetchGeriraList';
import { useNotificationOnNewGerira } from './helper/useNotificationOnNewGerira';

// default CACHE_EXPIRE of RSSHub is 5 min
const countDown = 5 * 60;

const { t, d } = useI18n();

const { geriraList, loading, refresh } = useFetchGeriraList();
const aliveGeriraList = useGeriraFilter(geriraList);

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
          <!--   todo: refactor with v-data-table   -->
          <v-table>
            <thead>
              <tr>
                <th
                  v-t="'gerira_live_query.gerira_room_id'"
                  class="text-left"
                />
                <th v-t="'gerira_live_query.gerira_level'" class="text-left" />
                <th
                  v-t="'gerira_live_query.gerira_end_time'"
                  class="text-left"
                />
              </tr>
            </thead>
            <tbody>
              <tr v-for="gerira in geriraList" :key="gerira.roomId">
                <td>
                  <CopyToClipboard :content="gerira.roomId" />
                </td>
                <td>Lv{{ gerira.level }}</td>
                <td>
                  {{ d(gerira.endTime, 'short') }}
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>
  </AppScaffold>
</template>
