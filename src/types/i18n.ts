import type { useI18n } from 'vue-i18n';

export type LocaleConfig = {
  id: string;
  name: string;
  content: any;
};

export type UseI18nResult = ReturnType<typeof useI18n>;

export type SupportedLocale = string;
