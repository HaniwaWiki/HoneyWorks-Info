import { useI18n } from 'vue-i18n';
import type { Ref } from 'vue';
import { computed } from 'vue';

// translate a key
export function useTranslation(key: string): Ref<string> {
  const { t } = useI18n();
  return computed(() => t(key));
}
