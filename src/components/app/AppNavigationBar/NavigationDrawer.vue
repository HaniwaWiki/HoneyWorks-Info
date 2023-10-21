<script setup lang="ts">
import { useNavigationDrawerList } from './config';
import NavigationListItem from '@/components/base/NavigationListItem/NavigationListItem.vue';

defineProps<{ drawer: boolean; }>();

defineEmits(['update:drawer']);

const navigationDrawerList = useNavigationDrawerList();
</script>

<template>
  <v-navigation-drawer
    :model-value="drawer"
    @update:model-value="(val: boolean) => $emit('update:drawer', val)"
  >
    <v-list dense nav density="compact">
      <v-item-group mandatory>
        <NavigationListItem
          v-for="item in navigationDrawerList"
          :key="item.title"
          :item="item"
        />
      </v-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped></style>
