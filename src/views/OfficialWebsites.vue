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
import AppScaffold from '@/components/app/AppScaffold.vue';
import ButtonLink from '../components/base/ButtonLink.vue';

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
    text: 'HoneyWorks - LINE',
    url: 'https://line.me/R/ti/p/@honeyworks',
  },
  {
    text: '【ハニプレ】HoneyWorks公式リズムゲーム｜好評配信中┗|∵|┓',
    url: 'https://honeyworks-game.com/',
  },
];
const officialTwitterIds = [
  // HoneyWorks Official
  'HoneyWorks_828',
  'HoneyWorks_Game',
  'HoneyWorksMovie',
  // creator
  '_Gom_',
  'shito_stereo',
  'yamako2626',
  // singer
  'CHiCOxxx_tweet',
  'Hanon_moco',
  'Kotoha_ktnh',
  'HaKoniwalily',
  'hiina_ntn',
  'mogelatte',
  // characters
  'mona_4_24',
  'FT4_official',
  'LIP_LIP_222',
  'maedakun_sr',
  'vjpofficial',
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
