import type { SupportedServer } from '@/api/baseUrls';
import type { SupportedLocale } from '@/types/i18n';

export type Settings = {
  locale: SupportedLocale;
  hideDisclaimer: boolean;
  server: SupportedServer;
  primaryColor: string;
  initialized: boolean;
};
