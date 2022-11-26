import type { I18n } from 'vue-i18n';
import { nextTick } from 'vue';
import axios from '@/utils/request';
import { getBaseUrls } from '@/config';
import type { SupportedLocale } from '@/i18n/supportedLocales';

// load locale messages dynamically to given i18n or global i18n
export async function loadLocaleMessages(locale: SupportedLocale, i18n?: I18n) {
  const { localeBaseUrl } = getBaseUrls();
  const messages = (await axios(`${localeBaseUrl}/${locale}/frontend.json`))
    .data;

  // update locale message
  i18n!.global.setLocaleMessage(locale, messages);

  return nextTick();
}
