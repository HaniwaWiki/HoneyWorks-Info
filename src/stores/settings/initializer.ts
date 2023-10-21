import type { Ref } from 'vue';
import type { Settings } from '@/stores/settings/types';
import type { SupportedLocale } from '@/types/i18n';
import { defaultLocale } from '@/i18n/config';
import type { SupportedServer } from '@/api/baseUrls';

export function initializeLocale(): SupportedLocale {
  const languageMap: Record<string, SupportedLocale> = {
    'zh-CN': 'zh_Hans',
    'zh': 'zh_Hans',
    'en': 'en',
    'ja': 'ja',
  };

  const language = navigator.language;

  // try to exactly match Object.keys(languageMap), then try to include, finally fallback to default
  return languageMap[language]
    ?? Object.entries(languageMap).find(([key]) => language.includes(key))?.[1]
    ?? defaultLocale;
}

export function initializeServer(): SupportedServer {
  // use local timezone to guess whether user is in China
  if (Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Shanghai')
    return 'cn';

  return 'jp';
}

export function initializeSettings(settings: Ref<Settings>) {
  settings.value.server = initializeServer();
  settings.value.locale = initializeLocale();
  settings.value.initialized = true;
}
