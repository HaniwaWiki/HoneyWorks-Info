import type { I18n, I18nOptions } from 'vue-i18n';
import { createI18n } from 'vue-i18n';
import type { WritableComputedRef } from 'vue';
import { loadLocaleMessages } from '@/i18n/loadLocaleMessages';
import type { SupportedLocale } from '@/i18n/supportedLocales';

export function getDefaultLocale(): SupportedLocale {
  return 'zh_Hans';
}

function setI18nLanguage(i18n: I18n, locale: SupportedLocale) {
  if (i18n.mode === 'legacy')

    i18n.global.locale = locale;
  else

    (i18n.global.locale as WritableComputedRef<string>).value = locale;

  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector('html')!.setAttribute('lang', locale);
}

export function setupI18n(options: I18nOptions) {
  const i18n = createI18n(options);
  const locale = (options.locale || 'en') as SupportedLocale;
  setI18nLanguage(i18n, locale);
  loadLocaleMessages(locale, i18n);
  return i18n;
}
