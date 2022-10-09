<!-- v-list-item used in navigation-drawer -->
<template>
  <v-list-group v-if="item.subItems">
    <template #activator="{ props }">
      <NavigationListItem v-bind="props" :item="{ ...item, subItems: null }" />
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
    ripple
    active-color="primary"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { NavigationListItemProp } from './types';

const props = defineProps<{ item: NavigationListItemProp }>();
// const active = ref(true);
// const active = computed(
//   () =>
//     window.location.pathname !== '/' &&
//     props.item.href &&
//     window.location.pathname.startsWith(props.item.href)
// );

type LinkProp = {
  to?: string;
  href?: string;
  target?: string;
};

const linkProp = computed<LinkProp>(() => {
  const href = props.item.href;
  // is not a valid URL
  if (!href) {
    return {};
  }
  // is external link, use href
  if (href.startsWith('http')) {
    return { href, target: '_blank' };
  }
  // is internal link, use router-link
  return { to: href };
});
</script>
