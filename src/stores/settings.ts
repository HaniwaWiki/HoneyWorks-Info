import { defineStore } from 'pinia';
import type { SupportedLocale } from '@/i18n/supportedLocales';
import { isSupportedLocale } from '@/i18n/supportedLocales';
import { useLocalStorage } from '@/composables/useLocalStorage';

const SETTINGS_KEY = 'settings';

const [getSettingsInLocalStorage, setSettingsInLocalStorage] = useLocalStorage(SETTINGS_KEY, {
  locale: 'en' as SupportedLocale,
  hideDisclaimer: false,
});

export const useSettingsStore = defineStore(SETTINGS_KEY, {
  state: () => getSettingsInLocalStorage(),
  actions: {
    async setLocale(locale: string) {
      if (!isSupportedLocale(locale))
        return;
      // set pinia and local storage
      this.locale = locale;
      setSettingsInLocalStorage(this.$state);
    },
    setHideDisclaimer(hideDisclaimer: boolean) {
      this.hideDisclaimer = hideDisclaimer;
      setSettingsInLocalStorage(this.$state);
    },
  },
});

