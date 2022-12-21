import type { Ref } from 'vue';
import { useTranslation } from '@/composables/useTranslation';

// get localized app name
export function useAppName(): Ref<string> {
  return useTranslation('global.app_name');
}
