<template>
  <v-navigation-drawer
    :model-value="drawer"
    @update:model-value="(val) => $emit('update:drawer', val)"
  >
    <v-list dense nav density="compact">
      <v-item-group mandatory :value="pathname">
        <NavigationListItem
          v-for="item in items"
          :key="item.title"
          :item="item"
        />
      </v-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { NavigationListItemProp } from '../../base/NavigationListItem/types';
import NavigationListItem from '../../base/NavigationListItem/NavigationListItem.vue';

defineProps<{ drawer: boolean }>();

defineEmits(['update:drawer']);

const pathname = computed(() => window.location.pathname);
const items: NavigationListItemProp[] = [
  {
    title: 'HoneyWorks Official Links',
    icon: 'mdi-link',
    href: '/official-websites',
  },
  {
    title: 'Information',
    icon: 'mdi-information-outline',
    subItems: [
      { title: 'Characters', href: '/info/characters' },
      { title: 'Character Cards', href: '/info/character-cards' },
      { title: 'Music Parts', href: '/info/music-parts' },
      { title: 'Scene Cards', href: '/info/scene-cards' },
      { title: 'Events', href: '/info/events' },
    ],
  },
  {
    title: 'Tools',
    icon: 'mdi-hammer',
    subItems: [{ title: 'HWPL Calendar', href: '/tools/calendar' }],
  },
  { title: 'About Us', icon: 'mdi-account', href: '/about' },
];
</script>

<style scoped></style>
