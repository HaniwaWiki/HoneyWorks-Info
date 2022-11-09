import { ref, Ref, unref, watch } from 'vue';
import { GeriraInfo } from '@/views/tools/GeriraLiveQuery/helper/type';
import { MaybeRef } from '@/types/vue/ref';
import { useI18n, VueI18n } from 'vue-i18n';
import _ from 'lodash';
import { UseI18nResult } from '@/i18n/types';
import { sendNotification } from '@/utils/notification';

function notifyNewGerira(newGerira: GeriraInfo, { t, d }: UseI18nResult) {
  const title = t('gerira_live_query.notification_title', newGerira);
  const body = t('gerira_live_query.notification_body', {
    ...newGerira,
    endTime: d(newGerira.endTime, 'time'),
  });
  const icon = '/favicon.webp';

  const notification = sendNotification(title, {
    body,
    icon,
  });
}

export function useNotificationOnNewGerira(
  geriraInfo: Ref<GeriraInfo[]>,
  watchLevel: MaybeRef<number>
) {
  const i18n = useI18n() as UseI18nResult;
  const oldGeriraInfo = ref<GeriraInfo[]>([]);

  watch([geriraInfo, ref(watchLevel)], () => {
    // get new gerira
    const newGeriraList = _.differenceWith(
      geriraInfo.value,
      oldGeriraInfo.value,
      (gerira1, gerira2) => gerira1.roomId === gerira2.roomId
    );

    // filter new gerira by level
    const newSatisfiedGeriraList = newGeriraList.filter(
      (gerira) => gerira.level >= unref(watchLevel)
    );
    if (newSatisfiedGeriraList.length === 0) {
      return;
    }

    // choose best gerira to notify
    // best means "highest-level" and "latest"
    const bestGerira = _.sortBy(newSatisfiedGeriraList, [
      'level',
      'endTime',
    ]).reverse()[0];

    notifyNewGerira(bestGerira, i18n);

    // update oldGeriraInfo
    oldGeriraInfo.value = geriraInfo.value;
  });
}
