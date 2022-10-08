<template>
  <div class="text-h3">{{ title }}</div>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { getAppName } from '@/config';
import { useRoute } from 'vue-router';

const props = defineProps<{ title?: string }>();
const route = useRoute();

const title = computed(() => props.title || String(route.name) || '');
const pageTitle = computed(() => `${title.value} | ${getAppName()}`);

watchEffect(() => {
  document.title = pageTitle.value;
});
</script>
