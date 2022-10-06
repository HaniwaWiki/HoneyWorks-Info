<template>
  <div class="text-h3">{{ title }}</div>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { getAppName } from '@/config';
import router from '../../router';

const props = defineProps<{ title?: string }>();

const title = computed(
  () => props.title || String(router.currentRoute.value.name) || ''
);

const pageTitle = computed(() => `${title.value} | ${getAppName()}`);

watchEffect(() => {
  document.title = pageTitle.value;
});
</script>
