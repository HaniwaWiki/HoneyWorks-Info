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
            <ButtonLink
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
import AppScaffold from '@/components/AppScaffold/AppScaffold.vue';
import ButtonLink from '../components/base/ButtonLink.vue';
import PageTitle from '../components/base/PageTitle.vue';

const officialWebsites = [
  {
    text: 'HoneyWorks Official Website',
    url: 'https://honeyworks.jp/',
  },
  {
    text: '告白実行委員会　～恋愛シリーズ～',
    url: 'https://honeyworks.jp/special/',
  },
  {
    text: 'CHiCO with HoneyWorks',
    url: 'https://www.chicoxxx.com/',
  },
  {
    text: 'KumaPan of HoneyWorks Dairy ver. – LINE stickers | LINE STORE',
    url: 'https://store.line.me/stickershop/product/1258062',
  },
  {
    text: '【ハニプレ】HoneyWorks公式リズムゲーム｜好評配信中┗|∵|┓',
    url: 'https://honeyworks-game.com/',
  },
];
const officialTwitterIds = [
  'HoneyWorks_Game',
  'HoneyWorks_828',
  'HoneyWorksMovie',
  'mona_4_24',
  'CHiCOxxx_tweet',
  'yamako2626',
  'shito_stereo',
  'HaKoniwalily',
  'maedakun_sr',
  'FT4_official',
  '_Gom_',
  'LIP_LIP_222',
  'vjpofficial',
  'mogelatte',
  'hiina_ntn',
  'Hanon_moco',
  'Kotoha_ktnh',
  'dolce5_official',
];
const officialYoutubeChannels = [
  {
    text: 'HoneyWorks OFFICIAL',
    url: 'https://www.youtube.com/c/HoneyWorksOFFICIAL',
  },
  {
    text: 'CHiCO with HoneyWorks チャンネル',
    url: 'https://www.youtube.com/c/chicoxxx',
  },
  {
    text: 'Hanon',
    url: 'https://www.youtube.com/channel/UCJB1hgmiAD4ysg0Ao7uS8Rw',
  },
  {
    text: 'Kotoha',
    url: 'https://www.youtube.com/channel/UC3ql_EU4JnaE3Rh3cqbHu6g',
  },
  {
    text: '可憐なアイボリー Official',
    url: 'https://www.youtube.com/channel/UCrxb-1OHdCKq7mpxsJpz8ww',
  },
];

type OfficialWebsiteContent = {
  name: string;
  icon: string;
  links: {
    text: string;
    url: string;
  }[];
};
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
