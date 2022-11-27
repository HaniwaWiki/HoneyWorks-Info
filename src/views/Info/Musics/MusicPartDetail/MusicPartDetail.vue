<script setup lang='ts'>
// page options
import { useRoute } from 'vue-router';
import { toRefs, watchEffect } from 'vue';
import { useFirstOfCollection } from '../../../../composables/useCollection';
import { useMusicPartInfo } from '../../../../composables/hwpl/useMusicPartInfo';
import AppScaffold from '../../../../components/app/AppScaffold.vue';
import ResourceTabs from '../../../../components/base/ResourceTabs/ResourceTabs.vue';
import { useMusicPartResources } from './helper/useMusicPartResources';
import { useMusicPartRelatedResources } from './helper/useMusicPartRelatedResources';
import MusicPartDetailGeneral from './helper/MusicPartDetailGeneral.vue';
import MusicPartDetailGameStat from './helper/MusicPartDetailGameStat.vue';

const musicPartId = Number(useRoute().params.id);

// fetch data
const musicPartInfo = useMusicPartInfo(musicPartId);
const {
  musicPart,
  music,
  song,
  singer,
  musicalScores,
} = musicPartInfo;

const musicPartResources = useMusicPartResources(musicPartInfo);
const relatedResources = useMusicPartRelatedResources(musicPartInfo);
</script>

<template>
  <AppScaffold :title="song?.Name" :subtitle="musicPart?.Name">
    <v-card>
      <ResourceTabs :resources="musicPartResources" />
    </v-card>

    <MusicPartDetailGeneral
      :music="music"
      :music-part="musicPart"
      :musical-scores="musicalScores"
      :singer="singer"
      :song="song"
    />

    <MusicPartDetailGameStat
      :music-part="musicPart"
      :musical-scores="musicalScores"
    />

    <!--    <CharacterCardDetailSkill :character-card="characterCard" /> -->

    <v-card :title="$t('global.related_resources')">
      <ResourceTabs :resources="relatedResources" />
    </v-card>
  </AppScaffold>
</template>
