<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAppName } from '@/composables/useAppName';
import AppBarChangeLanguage from '@/components/app/AppNavigationBar/AppBarChangeLanguage.vue';

defineProps<{ drawer: boolean; }>();

defineEmits(['update:drawer']);

const route = useRoute();
const { t } = useI18n();
const appName = useAppName();

const title = computed(() => {
  const routeName = String(route.name);
  return route.name ? t(`route.${routeName}`) : '';
});
const appBarTitle = computed(() =>
  title.value ? `${title.value} | ${appName.value}` : appName.value,
);

// sync app-bar title to website title
watchEffect(() => {
  document.title = appBarTitle.value;
});
</script>

<template>
  <v-app-bar color="primary">
    <template #prepend>
      <v-app-bar-nav-icon @click="$emit('update:drawer', !drawer)" />
    </template>

    <v-app-bar-title>{{ appBarTitle }}</v-app-bar-title>

    <template #append>
      <AppBarChangeLanguage />
      <v-app-bar-nav-icon icon="mdi-cog" />
    </template>
  </v-app-bar>
</template>

<style scoped></style>
