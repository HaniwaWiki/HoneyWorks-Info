<template>
  <v-navigation-drawer
    :model-value="drawer"
    @update:model-value="(val) => $emit('update:drawer', val)"
  >
    <v-list dense nav density="compact">
      <CascadeListItem v-for="item in items" :key="item.title" :item="item" />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { CascadeListItemProp } from '../CascadeListItem/types';
import CascadeListItem from '../CascadeListItem/CascadeListItem.vue';

defineProps<{ drawer: boolean }>();

defineEmits(['update:drawer']);

const items: CascadeListItemProp[] = [
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
      { title: 'Songs', href: '/info/songs' },
      { title: 'Scene Cards', href: '/info/scene-cards' },
      { title: 'Events', href: '/info/events' },
    ],
  },
  {
    title: 'Tools',
    icon: 'mdi-hammer',
    subItems: [{ title: 'HoneyWorks Calendar', href: '/tools/calendar' }],
  },
  { title: 'About Us', icon: 'mdi-account', href: '/about' },
];
</script>

<style scoped></style>
