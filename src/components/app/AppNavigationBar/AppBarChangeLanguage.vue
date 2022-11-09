<template>
  <v-menu>
    <template #activator="{ props }">
      <v-app-bar-nav-icon icon="mdi-translate" v-bind="props" />
    </template>
    <v-list>
      <!--
      fixme: show user current choice.
        current version is not working, since Vuetify docs are unclear on v-item-group
      -->
      <v-item-group v-model="i18n.locale" selected-class="text-primary">
        <v-list-item
          v-for="[code, lang] in Object.entries(supportedLocaleMap)"
          :key="code"
          :value="code"
          density="comfortable"
        >
          <v-list-item-title @click="updateLocale(code)">
            {{ lang }}
          </v-list-item-title>
        </v-list-item>
      </v-item-group>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import {
  isSupportedLocale,
  SupportedLocale,
  supportedLocaleMap,
} from '@/i18n/supportedLocales';
import { useI18n } from 'vue-i18n';
import { loadLocaleMessages } from '@/i18n/loadLocaleMessages';

const i18n = useI18n();

async function updateLocale(locale: string) {
  if (isSupportedLocale(locale)) {
    await loadLocaleMessages(locale);
    i18n.locale.value = locale;
  }
}
</script>
