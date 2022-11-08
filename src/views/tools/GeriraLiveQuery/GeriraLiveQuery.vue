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
              <tr v-for="gerira in geriraInfo" :key="gerira.roomId">
                <td>
                  <CopyToClipboard :content="gerira.roomId" />
                </td>
                <td>Lv{{ gerira.level }}</td>
                <td>
                  {{
                    d(gerira.endTime, 'short')
                  }}
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>
  </AppScaffold>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useGeriraInfo } from './helper/useGeriraInfo';
import AppScaffold from '../../../components/app/AppScaffold.vue';
import { useCountDown } from '../../../composables/useCountDown';
import CopyToClipboard from '../../../components/base/CopyToClipboard.vue';
import { useNotificationOnNewGerira } from './helper/useNotificationOnNewGerira';

// default CACHE_EXPIRE of RSSHub is 5 min
const countDown = 5 * 60;

const { t, d } = useI18n();

const { geriraInfo, loading, refresh } = useGeriraInfo();
useNotificationOnNewGerira(geriraInfo, 3);

const { count, reset } = useCountDown(countDown, (resetFn) => {
  refresh();
  resetFn(countDown);
});

function refreshGeriraInfoAndCountDown() {
  refresh();
  reset(countDown);
}
</script>
