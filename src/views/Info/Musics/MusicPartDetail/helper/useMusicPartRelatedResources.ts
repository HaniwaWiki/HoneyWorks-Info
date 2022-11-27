import type { Ref } from 'vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Resource } from '@/components/base/ResourceTabs/Resource';
import type { MusicPartInfo } from '@/composables/hwpl/useMusicPartInfo';

export function useMusicPartRelatedResources({
  // TODO finish this function
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  musicPart,
}: MusicPartInfo): Ref<Resource[]> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useI18n();

  return computed(() => {
    return [];
  });
}
