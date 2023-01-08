import { computed } from 'vue';
import readme_en from '../text/en.md';
import readme_zh from '../text/zh_Hans.md';
import { useSettingsStore } from '@/stores/settings';
import type { SupportedLocale } from '@/i18n/supportedLocales';

function getReadme(locale: SupportedLocale) {
  switch (locale) {
    case 'zh_Hans':
      return readme_zh;
    default:
      return readme_en;
  }
}

export function useAboutUsReadme() {
  const settingsStore = useSettingsStore();
  return computed(() => getReadme(settingsStore.settings.locale));
}
