<template>
  <v-app-bar color="primary">
    <template #prepend>
      <v-app-bar-nav-icon @click="$emit('update:drawer', !drawer)" />
    </template>

    <v-app-bar-title>{{ pageTitle }}</v-app-bar-title>

    <template #append>
      <v-app-bar-nav-icon icon="mdi-translate" />
      <v-app-bar-nav-icon icon="mdi-cog" />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { getAppName } from '@/config';
import { useRoute } from 'vue-router';

defineProps<{ drawer: boolean }>();

const route = useRoute();
const title = computed(() => String(route.name ?? ''));
const pageTitle = computed(() =>
  title.value ? `${title.value} | ${getAppName()}` : getAppName()
);

watchEffect(() => {
  document.title = pageTitle.value;
});

defineEmits(['update:drawer']);
</script>

<style scoped></style>
