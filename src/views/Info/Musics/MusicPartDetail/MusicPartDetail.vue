<script setup lang='ts'>
// page options
import { useRoute } from 'vue-router';
import { computed, unref } from 'vue';
import { useCollection, useFirstOfCollection } from '../../../../composables/useCollection';
import AppScaffold from '../../../../components/app/AppScaffold.vue';
import ResourceTabs from '../../../../components/base/ResourceTabs/ResourceTabs.vue';
import { useMusicPartResources } from './helper/useMusicPartResources';
import { useMusicPartRelatedResources } from './helper/useMusicPartRelatedResources';
import MusicPartDetailGeneral from './helper/MusicPartDetailGeneral.vue';
import MusicPartDetailGameStat from './helper/MusicPartDetailGameStat.vue';

const musicPartId = Number(useRoute().params.id);

// fetch data
const { item: musicPart } = useFirstOfCollection('MusicParts', computed(() => ({
  Id: unref(musicPartId),
})));
const { item: music } = useFirstOfCollection('Musics', computed(() => ({
  Id: musicPart?.value?.MusicId,
})));
const { item: song } = useFirstOfCollection('Songs', computed(() => ({
  Id: music.value?.SongId,
})));
const { item: singer } = useFirstOfCollection('Singers', computed(() => ({
  Id: music.value?.SingerId,
})));
const { collection: musicalScores } = useCollection('MusicalScores', computed(() => ({
  MusicPartId: unref(musicPartId),
})));

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

    <!--    <CharacterCardDetailSkill :character-card="characterCard" /> -->

    <v-card :title="$t('global.related_resources')">
      <ResourceTabs :resources="relatedResources" />
    </v-card>
  </AppScaffold>
</template>
