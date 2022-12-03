<script setup lang='ts'>
import type { Event } from '@/types/HWPL/Event';

defineProps<{ events: Event[]; }>();
</script>

<template>
  <v-expansion-panel
    title="components.item_source.event_achievement_rewards"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  />
</template>
