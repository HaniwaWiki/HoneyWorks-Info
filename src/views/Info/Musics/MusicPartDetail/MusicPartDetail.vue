<script setup lang='ts'>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useMusicPartResources } from './helper/useMusicPartResources';
import { useMusicPartRelatedResources } from './helper/useMusicPartRelatedResources';
import MusicPartDetailGeneral from './helper/MusicPartDetailGeneral.vue';
import MusicPartDetailGameStat from './helper/MusicPartDetailGameStat.vue';
import { useCollection, useFirstOfCollection } from '@/composables/useCollection';
import ResourceTabs from '@/components/base/ResourceTabs/ResourceTabs.vue';
import AppScaffold from '@/components/app/AppScaffold/AppScaffold.vue';

const musicPartId = Number(useRoute().params.id);

const { item: musicPart } = useFirstOfCollection('MusicParts', { Id: musicPartId });
const { item: music } = useFirstOfCollection('Musics', computed(() => ({
  Id: musicPart?.value?.MusicId,
})));
const { item: song } = useFirstOfCollection('Songs', computed(() => ({
  Id: music.value?.SongId,
})));
const { item: singer } = useFirstOfCollection('Singers', computed(() => ({
  Id: music.value?.SingerId,
})));
const { collection: musicalScores } = useCollection('MusicalScores', { MusicPartId: musicPartId });

const musicPartResources = useMusicPartResources(musicPart, music);
const relatedResources = useMusicPartRelatedResources();
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

    <v-card :title="$t('global.related_resources')">
      <ResourceTabs :resources="relatedResources" />
    </v-card>
  </AppScaffold>
</template>
