<template>
  <v-btn v-bind="$props" flat />
</template>

<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';
import { MdiIcons } from '@/types/mdi';

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
