<template>
  <v-chip size="x-small" class="mx-1" text :color="color">{{ text }}</v-chip>
</template>

<script setup lang="ts">
import {
  useCollection,
  useFirstOfCollection,
} from '@/composables/useCollection';
import { computed } from 'vue';

const props = defineProps<{
  tagId: number;
}>();

const colorMap = {
  1: '#9E9E9E',
  2: '#2196F3',
  3: '#FFC107',
  4: '#E91E63',
  5: '#6200ee',
} as { [level: number]: string };

const { item: tag } = useFirstOfCollection('Tags', { Id: props.tagId });

const color = computed(() => colorMap[tag.value?.IconLevel] || '');
const text = computed(() =>
  tag.value ? `${tag.value.Name}(${tag.value.IconLevel})` : ''
);
</script>

<style></style>
