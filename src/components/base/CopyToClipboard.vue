<template>
  <slot v-if="$slots.default" />
  <span v-else class="mr-2">{{ content }}</span>
  <v-icon
    icon="mdi-content-copy"
    color="grey"
    @click="copyContentToClipboard"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  content: string;
}>();

function copyContentToClipboard() {
  navigator.clipboard.writeText(props.content);
  // todo show breadcum
}
</script>
