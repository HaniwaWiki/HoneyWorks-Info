<script setup lang="ts">
import { computed } from 'vue';
import { useFirstOfCollection } from '@/composables/useCollection';

const props = defineProps<{
  tagId: number;
}>();

const colorMap = {
  1: '#9E9E9E',
  2: '#2196F3',
  3: '#FFC107',
  4: '#E91E63',
  5: '#6200ee',
};

const { item: tag } = useFirstOfCollection('Tags', { Id: props.tagId });

const color = computed(
  () => colorMap[tag.value?.IconLevel as keyof typeof colorMap] || '',
);
const text = computed(() =>
  tag.value ? `${tag.value.Name}(${tag.value.IconLevel})` : '',
);
</script>

<template>
  <v-chip size="x-small" class="mr-2 mb-2" :color="color">
    {{ text }}
  </v-chip>
</template>

<style></style>
