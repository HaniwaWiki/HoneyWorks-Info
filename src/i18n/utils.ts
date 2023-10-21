import type { I18n } from 'vue-i18n';
import { localeConfigs } from './config';

// load locale messages dynamically to given i18n or global i18n
export function loadLocaleMessages(locale: string, i18n?: I18n) {
  const message = localeConfigs.find(config => config.id === locale)?.content;
  if (!message) {
    console.error(`Failed to load locale messages for ${locale}`);
    return;
  }
  i18n!.global.setLocaleMessage(locale, message);
}
