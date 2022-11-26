<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Ref } from 'vue';
import { computed } from 'vue';
import ButtonExternalLink from '../../components/base/ButtonExternalLink.vue';
import AppScaffold from '@/components/app/AppScaffold.vue';
import type { OfficialWebsiteContent } from '@/views/OfficialWebsites/types';
import {
  officialTwitterIds,
  officialWebsites,
  officialYoutubeChannels,
} from '@/views/OfficialWebsites/websiteList';

const { t } = useI18n();

const officialWebsiteContents: Ref<OfficialWebsiteContent[]> = computed(() => [
  {
    name: t('global.website'),
    icon: 'mdi-web',
    links: officialWebsites,
  },
  {
    name: t('global.twitter'),
    icon: 'mdi-twitter',
    links: officialTwitterIds.map(id => ({
      text: `@${id}`,
      url: `https://twitter.com/${id}`,
    })),
  },
  {
    name: t('global.youtube'),
    icon: 'mdi-youtube',
    links: officialYoutubeChannels,
  },
]);
</script>

<template>
  <!-- container, row and col can limit card's position -->
  <AppScaffold>
    <v-row
      v-for="{ name, icon, links } in officialWebsiteContents"
      :key="name"
      class="justify-center"
    >
      <v-col>
        <v-card :title="name">
          <v-card-text>
            <ButtonExternalLink
              v-for="{ text, url } in links"
              :key="text"
              :inline="name !== 'Website'"
              :icon="icon"
              :text="text"
              :url="url"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </AppScaffold>
</template>
