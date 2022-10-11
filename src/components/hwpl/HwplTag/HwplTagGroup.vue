<template>
  <div class="hwpl-tag-group">
    <HwplTag v-for="tagId in tagNumbers" :key="tagId" :tag-id="tagId" />
  </div>
</template>
<script setup lang="ts">
import HwplTag from '@/components/hwpl/HwplTag/HwplTag.vue';
import { computed } from 'vue';

type Props = {
  tagIds: number[] | string;
};

const props = defineProps<Props>();

const tagNumbers = computed(() =>
  Array.isArray(props.tagIds)
    ? props.tagIds
    : props.tagIds.split(',').map(Number)
);
</script>

<style class="scss" scoped>
.hwpl-tag-group {
  display: flex;
  flex-flow: wrap;
}
</style>
