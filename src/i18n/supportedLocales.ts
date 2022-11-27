export const supportedLocaleMap = {
  en: 'English',
  zh_Hans: '简体中文',
  ja: '日本語',
} as const;

export type SupportedLocale = keyof typeof supportedLocaleMap;
export const supportedLocales = Object.keys(supportedLocaleMap) as SupportedLocale[];

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return locale in supportedLocaleMap;
}
