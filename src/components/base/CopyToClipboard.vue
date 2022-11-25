<script setup lang="ts">
type Props = {
  content: string;
  size?: string;
};
const props = withDefaults(defineProps<Props>(), {
  size: 'small',
});

function copyContentToClipboard() {
  navigator.clipboard.writeText(props.content);
  // todo show breadcum
}
</script>

<template>
  <slot v-if="$slots.default" />
  <span v-else class="mr-1">{{ props.content }}</span>
  <v-btn
    icon="mdi-content-copy"
    variant="text"
    :size="props.size"
    @click="copyContentToClipboard"
  />
</template>
