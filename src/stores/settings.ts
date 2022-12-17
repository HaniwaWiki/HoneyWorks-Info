import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { computed } from 'vue';
import { defaultPrimaryColor } from '@/palette';
import type { SupportedLocale } from '@/i18n/supportedLocales';
import type { SupportedServer } from '@/utils/baseUrlList';
import { setBackendByServer } from '@/utils/baseUrlList';
import { SETTINGS_KEY } from '@/utils/storage/prefixes';

// settings are stored in localStorage instead of async storage,
// so that settings should be read synchronously,
// and we can change backend server before XHRs are emitted to wrong backend.
const settingsInLocalStorage = useLocalStorage(SETTINGS_KEY, {
  locale: 'en' as SupportedLocale,
  hideDisclaimer: false,
  server: 'jp' as SupportedServer,
  primaryColor: defaultPrimaryColor as string,
});

// initial by value from localStorage
setBackendByServer(settingsInLocalStorage.value.server);

export const useSettingsStore = defineStore(SETTINGS_KEY, () => ({
  // ref()s become state properties
  settings: settingsInLocalStorage,

  // computed()s become getters
  primaryColor: computed(() => settingsInLocalStorage.value.primaryColor),

  // function()s become actions
  async setLocale(locale: SupportedLocale) {
    settingsInLocalStorage.value.locale = locale;
  },
  setHideDisclaimer(hideDisclaimer: boolean) {
    settingsInLocalStorage.value.hideDisclaimer = hideDisclaimer;
  },
  setServer(server: SupportedServer) {
    settingsInLocalStorage.value.server = server;
    setBackendByServer(server);
  },
  setPrimaryColor(color: string) {
    // update primary color will trigger useThemeColor
    settingsInLocalStorage.value.primaryColor = color;
  },
}));
