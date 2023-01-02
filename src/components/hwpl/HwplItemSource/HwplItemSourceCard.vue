<script setup lang='ts'>
import HwplItemSourceExpansionPanels from './HwplItemSourceExpansionPanels.vue';

const props = defineProps<{ itemId: number; }>();
</script>

<template>
  <div class="card">
    <div v-t="'components.item_source.item_sources'" class="v-card-title" />
    <HwplItemSourceExpansionPanels :item-id="itemId" />
  </div>
</template>
