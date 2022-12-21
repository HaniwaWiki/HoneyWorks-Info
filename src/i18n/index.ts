import type Vue from 'vue';
import type { Ref } from 'vue';
import { computed, watch } from 'vue';
import { useSettingsStore } from '@/stores/settings';
import { setupI18n } from '@/i18n/setup';
import { datetimeFormats } from '@/i18n/dateTimeFormats';
import { loadLocaleMessages } from '@/i18n/loadLocaleMessages';

// the creation of i18n needs to be done after app has loaded the store
// I wrap it in a function that can be called later
const i18nWrapper = {
  install(app: Vue.App<Element>) {
    // read user's locale from store
    const settingsStore = useSettingsStore();
    const locale = computed(() => settingsStore.settings.locale);

    const i18n = setupI18n({
      legacy: false,
      locale: locale.value,
      datetimeFormats,
    });

    app.use(i18n);

    // when settingsStore.locale changes, load language file and set locale value
    watch(locale, async () => {
      await loadLocaleMessages(locale.value, i18n);
      (i18n.global.locale as unknown as Ref<string>).value = locale.value;
    });
  },
};

export default i18nWrapper;
