<script setup lang="ts">
import { computed } from 'vue';
import HwplTag from '@/components/hwpl/HwplTag/HwplTag.vue';

type Props = {
  tagIds: number[] | string;
};

const props = defineProps<Props>();

const tagNumbers = computed(() =>
  Array.isArray(props.tagIds)
    ? props.tagIds
    : props.tagIds.split(',').map(Number),
);
</script>

<template>
  <div class="hwpl-tag-group">
    <HwplTag v-for="tagId in tagNumbers" :key="tagId" :tag-id="tagId" />
  </div>
</template>

<style class="scss" scoped>
.hwpl-tag-group {
  display: flex;
  flex-flow: wrap;
}
</style>
