import { defineStore } from 'pinia';
import { defaultPrimaryColor } from '@/palette';
import type { SupportedLocale } from '@/i18n/supportedLocales';
import type { SupportedServer } from '@/utils/baseUrlList';
import { setBackendByServer } from '@/utils/baseUrlList';
import { SETTINGS_KEY } from '@/utils/storage/prefixes';
import { createStorageVariable } from '@/utils/storage';

const defaultSettings = {
  locale: 'en' as SupportedLocale,
  hideDisclaimer: false,
  server: 'jp' as SupportedServer,
  primaryColor: defaultPrimaryColor as string,
};
const [getSettingsInLocalStorage, setSettingsInLocalStorage] = createStorageVariable(SETTINGS_KEY, defaultSettings);

getSettingsInLocalStorage()
  .then((settings) => {
    setBackendByServer(settings.server);
  });

// to asynchronously initialize state, we have to create an innerStore
// see https://github.com/vuejs/pinia/discussions/1176
export const useSettingsStore = () => {
  const innerStore = defineStore(SETTINGS_KEY, {
    state: () => defaultSettings,
    actions: {
      async setLocale(locale: SupportedLocale) {
        this.locale = locale;
        await setSettingsInLocalStorage(this.$state);
      },
      async setHideDisclaimer(hideDisclaimer: boolean) {
        this.hideDisclaimer = hideDisclaimer;
        await setSettingsInLocalStorage(this.$state);
      },
      async setServer(server: SupportedServer) {
        this.server = server;
        await setSettingsInLocalStorage(this.$state);

        setBackendByServer(server);
      },
      // update primary color will trigger useThemeColor in src/composables/useThemeColor.ts
      async setPrimaryColor(color: string) {
        this.primaryColor = color;
        await setSettingsInLocalStorage(this.$state);
      },
    },
  });

  const s = innerStore();
  getSettingsInLocalStorage().then(res => s.$patch(res));
  return s;
};
