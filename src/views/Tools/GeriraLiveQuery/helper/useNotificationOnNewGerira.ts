import type { Ref } from 'vue';
import { ref, unref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import _ from 'lodash';
import type { GeriraInfo } from '@/views/Tools/GeriraLiveQuery/helper/type';
import type { MaybeRef } from '@/types/vue/ref';
import type { UseI18nResult } from '@/types/i18n';
import { sendNotification } from '@/utils/notification';

function notifyNewGerira(geriraInfo: GeriraInfo, { t, d }: UseI18nResult) {
  const title = t('gerira_live_query.notification_title', geriraInfo as Record<string, unknown>);
  const body = t('gerira_live_query.notification_body', {
    ...geriraInfo,
    endTime: d(geriraInfo.endTime, 'time'),
  });
  const icon = '/favicon.webp';

  sendNotification(title, {
    body,
    icon,
  });
}

export function useNotificationOnNewGerira(
  geriraInfo: Ref<GeriraInfo[]>,
  watchLevel: MaybeRef<number>,
) {
  const i18n = useI18n() as UseI18nResult;
  const oldGeriraInfo = ref<GeriraInfo[]>([]);

  watch([geriraInfo, ref(watchLevel)], () => {
    // get new gerira
    const newGeriraList = _.differenceWith(
      geriraInfo.value,
      oldGeriraInfo.value,
      (gerira1, gerira2) => gerira1.roomId === gerira2.roomId,
    );

    // filter new gerira by level
    const newSatisfiedGeriraList = newGeriraList.filter(
      gerira => gerira.level >= unref(watchLevel),
    );
    if (newSatisfiedGeriraList.length === 0)
      return;

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
