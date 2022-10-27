<template>
  <v-navigation-drawer
    :model-value="drawer"
    @update:model-value="(val) => $emit('update:drawer', val)"
  >
    <v-list dense nav density="compact">
      <v-item-group mandatory>
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
import { computed, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { NavigationListItemProp } from '../../base/NavigationListItem/types';
import NavigationListItem from '../../base/NavigationListItem/NavigationListItem.vue';

defineProps<{ drawer: boolean }>();

defineEmits(['update:drawer']);

const { t } = useI18n();

const items: Ref<NavigationListItemProp[]> = computed(() => [
  {
    title: t('global.honeyworks_official_links'),
    icon: 'mdi-link',
    href: '/official-websites',
  },
  {
    title: t('global.information'),
    icon: 'mdi-information-outline',
    subItems: [
      { title: t('global.characters'), href: '/info/characters' },
      { title: t('global.character_cards'), href: '/info/character-cards' },
      { title: t('global.music_parts'), href: '/info/music-parts' },
      {
        title: t('global.music_part_data'),
        href: `${window.location.origin}/music-part.html`,
      },
      { title: t('global.scene_cards'), href: '/info/scene-cards' },
      { title: t('global.events'), href: '/info/events' },
    ],
  },
  {
    title: t('global.tools'),
    icon: 'mdi-hammer',
    subItems: [{ title: t('global.hwpl_calendar'), href: '/tools/calendar' }],
  },
  { title: t('global.about_us'), icon: 'mdi-account', href: '/about' },
]);
</script>

<style scoped></style>
