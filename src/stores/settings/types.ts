import type { SupportedLocale } from '@/i18n/supportedLocales';
import type { SupportedServer } from '@/api/baseUrls';

export type Settings = {
  locale: SupportedLocale;
  hideDisclaimer: boolean;
  server: SupportedServer;
  primaryColor: string;
  initialized: boolean;
};
