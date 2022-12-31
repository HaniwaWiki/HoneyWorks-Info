import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { computed } from 'vue';
import { defaultPrimaryColor } from '@/palette';
import type { SupportedLocale } from '@/i18n/supportedLocales';
import type { SupportedServer } from '@/api/baseUrls';
import { defaultServer, setBaseUrlsByServer } from '@/api/baseUrls';
import { SETTINGS_KEY } from '@/utils/storage/prefixes';
import type { Settings } from '@/stores/settings/types';
import { initializeSettings } from '@/stores/settings/initializer';
import { defaultLocale } from '@/i18n/supportedLocales';

// settings are stored in localStorage instead of async storage,
// so that settings should be read synchronously,
// and we can change backend server before XHRs are emitted to wrong backend.
const settingsInLocalStorage = useLocalStorage<Settings>(SETTINGS_KEY, {
  locale: defaultLocale,
  server: defaultServer,
  primaryColor: defaultPrimaryColor,
  hideDisclaimer: false,
  initialized: false,
});

if (!settingsInLocalStorage.value.initialized)
  initializeSettings(settingsInLocalStorage);

// initial baseUrl by value from localStorage
setBaseUrlsByServer(settingsInLocalStorage.value.server);

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
    setBaseUrlsByServer(server);
  },
  setPrimaryColor(color: string) {
    // update primary color will trigger useThemeColor
    settingsInLocalStorage.value.primaryColor = color;
  },
}));
