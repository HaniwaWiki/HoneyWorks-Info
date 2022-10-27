import { getDefaultLocale, setupI18n } from '@/i18n/setup';
import { datetimeFormats } from '@/i18n/dateTimeFormats';

export const i18n = setupI18n({
  legacy: false,
  locale: getDefaultLocale(),
  datetimeFormats,
});
