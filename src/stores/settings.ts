import { defineStore } from 'pinia';
import { defaultPrimaryColor } from '../palette';
import type { SupportedLocale } from '@/i18n/supportedLocales';
import { useLocalStorage } from '@/composables/useLocalStorage';
import type { SupportedServer } from '@/utils/baseUrlList';
import { setBackendByServer } from '@/utils/baseUrlList';

const SETTINGS_KEY = 'settings';

const [getSettingsInLocalStorage, setSettingsInLocalStorage] = useLocalStorage(SETTINGS_KEY, {
  locale: 'en' as SupportedLocale,
  hideDisclaimer: false,
  server: 'jp' as SupportedServer,
  primaryColor: defaultPrimaryColor as string,
});

// initial by value from localStorage
setBackendByServer(getSettingsInLocalStorage().server);

export const useSettingsStore = defineStore(SETTINGS_KEY, {
  state: () => getSettingsInLocalStorage(),
  actions: {
    async setLocale(locale: SupportedLocale) {
      this.locale = locale;
      setSettingsInLocalStorage(this.$state);
    },
    setHideDisclaimer(hideDisclaimer: boolean) {
      this.hideDisclaimer = hideDisclaimer;
      setSettingsInLocalStorage(this.$state);
    },
    setServer(server: SupportedServer) {
      this.server = server;
      setSettingsInLocalStorage(this.$state);

      setBackendByServer(server);
    },
    // update primary color will trigger useThemeColor
    setPrimaryColor(color: string) {
      this.primaryColor = color;
      setSettingsInLocalStorage(this.$state);
    },
  },
});

