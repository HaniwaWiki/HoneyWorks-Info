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

<script setup lang="ts">
import AppScaffold from '@/components/app/AppScaffold.vue';
import { OfficialWebsiteContent } from '@/views/OfficalWebsites/types';
import {
  officialTwitterIds,
  officialWebsites,
  officialYoutubeChannels,
} from '@/views/OfficalWebsites/websiteList';
import ButtonExternalLink from '../../components/base/ButtonExternalLink.vue';

const officialWebsiteContents: OfficialWebsiteContent[] = [
  {
    name: 'Website',
    icon: 'mdi-web',
    links: officialWebsites,
  },
  {
    name: 'Twitter',
    icon: 'mdi-twitter',
    links: officialTwitterIds.map((id) => ({
      text: `@${id}`,
      url: `https://twitter.com/${id}`,
    })),
  },
  {
    name: 'Youtube',
    icon: 'mdi-youtube',
    links: officialYoutubeChannels,
  },
];
</script>
