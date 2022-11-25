<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';
import type { MdiIcons } from '@/types/mdi';

type Props = {
  to: RouteLocationRaw;
  icon?: MdiIcons;
  size?: 'x-small' | 'small' | 'default' | 'large' | 'x-large';
};

withDefaults(defineProps<Props>(), {
  icon: 'mdi-open-in-new',
  size: 'default',
});
</script>

<template>
  <v-btn v-bind="$props" variant="text" />
</template>
