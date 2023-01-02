<script setup lang='ts'>
import { computed } from 'vue';
import type { MdiIcons } from '@/types/mdi';
import type { ButtonSize } from '@/types/vuetify/button';

export type EventStatus = 'coming' | 'in_progress' | 'finished';

const props = defineProps<{
  status?: EventStatus;
  startAt?: number;
  endAt?: number;
  clickable?: false;
  size?: ButtonSize;
}>();

const iconMap: Record<EventStatus, MdiIcons> = {
  coming: 'mdi-alarm',
  in_progress: 'mdi-bell-alert',
  finished: 'mdi-alarm',
};

const colorMap: Record<EventStatus, string> = {
  coming: 'blue',
  in_progress: 'amber',
  finished: 'green',
};

const now = Date.now() / 1000;
const computedStatus = computed(() => {
  const { status, startAt, endAt } = props;
  if (status)
    return status;
  if (startAt && endAt) {
    if (now < startAt)
      return 'coming';
    if (now < endAt)
      return 'in_progress';
    return 'finished';
  }

  return '';
});
</script>

<template>
  <v-btn
    v-if="computedStatus"
    :size="size"
    :color="colorMap[computedStatus]"
    :ripple="clickable"
    :flat="!clickable"
  >
    <v-icon class="mr-1">
      {{ iconMap[computedStatus] }}
    </v-icon>
    {{ $t(`components.button_event_status.${computedStatus}`) }}
  </v-btn>
</template>
