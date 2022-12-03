<script setup lang='ts'>
import HwplItemSourceExpansionPanels from './HwplItemSourceExpansionPanels.vue';

const props = defineProps<{ itemId: number; }>();
</script>

<template>
  <div v-t="'components.item_source.item_source'" class="v-card-title" />
  <HwplItemSourceExpansionPanels :item-id="itemId" />
</template>
