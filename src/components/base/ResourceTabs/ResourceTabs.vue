<template>
  <div>
    <v-tabs color="primary">
      <v-tab v-for="{ name } in resources" :key="name">
        {{ name }}
      </v-tab>
    </v-tabs>
  </div>
</template>

<script setup lang="ts">
import { Resource } from '@/components/base/ResourceTabs/types';

defineProps<{
  resources: Resource[];
}>();
</script>
