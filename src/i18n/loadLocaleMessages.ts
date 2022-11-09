import { I18n } from 'vue-i18n';
import axios from '@/utils/request';
import { localeBaseUrl } from '@/config';
import { nextTick } from 'vue';
import { i18n as globalI18n } from '@/i18n/index';
import { SupportedLocale } from '@/i18n/supportedLocales';

// load locale messages dynamically to given i18n or global i18n
export async function loadLocaleMessages(locale: SupportedLocale, i18n?: I18n) {
  const messages = (await axios(`${localeBaseUrl}/${locale}/frontend.json`))
    .data;

  // update locale message
  (i18n || globalI18n).global.setLocaleMessage(locale, messages);

  return nextTick();
}
