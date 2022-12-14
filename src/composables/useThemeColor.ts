import { computed, watchEffect } from 'vue';
import { useTheme } from 'vuetify';
import { useSettingsStore } from '../stores/settings';

// set theme color from user settings
export function useThemeColor() {
  const settingsStore = useSettingsStore();
  const primaryColor = computed(() => settingsStore.primaryColor);
  const theme = useTheme();

  // update theme color when user settings changed
  watchEffect(() => {
    theme.themes.value.light.colors.primary = primaryColor.value;
    // theme.themes.value.dark.colors.primary = settingsStore.defaultPrimaryColor;

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', primaryColor.value);
  });
}
