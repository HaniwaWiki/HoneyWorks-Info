<!-- v-list-item used in navigation-drawer -->
<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { NavigationListItemProp } from './types';

const props = defineProps<{ item: NavigationListItemProp }>();

const route = useRoute();

const active = computed(
  () => !!props.item.href && route.path.startsWith(props.item.href),
);

type LinkProp = {
  to?: string;
  href?: string;
  target?: string;
};

const linkProp = computed<LinkProp>(() => {
  const href = props.item.href;
  // is not a valid URL
  if (!href)
    return {};

  // is external link, use href
  if (href.startsWith('http'))
    return { href, target: '_blank' };

  // is internal link, use router-link
  return { to: href };
});
</script>

<template>
  <v-list-group v-if="item.subItems">
    <template #activator="{ slotProps }">
      <NavigationListItem v-bind="slotProps" :item="{ ...item, subItems: null }" />
    </template>
    <NavigationListItem
      v-for="subItem in item.subItems"
      :key="subItem.title"
      :item="subItem"
    />
  </v-list-group>
  <v-list-item
    v-else
    :prepend-icon="item.icon"
    :title="item.title"
    :to="linkProp.to"
    :href="linkProp.href"
    :target="linkProp.target"
    :value="item.href"
    :active="active"
    active-color="primary"
  />
</template>
