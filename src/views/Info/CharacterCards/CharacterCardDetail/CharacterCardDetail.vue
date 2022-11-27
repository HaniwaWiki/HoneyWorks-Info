<script setup lang="ts">
import { useRoute } from 'vue-router';
import {
  useCharacterCardResources,
} from './helper/useCharacterCardResources';
import AppScaffold from '@/components/app/AppScaffold.vue';
import { useFirstOfCollection } from '@/composables/useCollection';
import { useCharacterCardName } from '@/composables/hwpl/useCharacterCardName';
import ResourceTabs from '@/components/base/ResourceTabs/ResourceTabs.vue';
import {
  useCharacterCardRelatedResources,
} from '@/views/Info/CharacterCards/CharacterCardDetail/helper/useCharacterCardRelatedResources';
import CharacterCardDetailGeneral
  from '@/views/Info/CharacterCards/CharacterCardDetail/helper/CharacterCardDetailGeneral.vue';
import CharacterCardDetailGameStat
  from '@/views/Info/CharacterCards/CharacterCardDetail/helper/CharacterCardDetailGameStat.vue';
import CharacterCardDetailSkill
  from '@/views/Info/CharacterCards/CharacterCardDetail/helper/CharacterCardDetailSkill.vue';

// page options
const characterCardId = Number(useRoute().params.id);

// fetch data
const { item: characterCard } = useFirstOfCollection('CharacterCards', {
  Id: characterCardId,
});

// parse function and parsed data
const [cardName, characterName] = useCharacterCardName(characterCard);
const characterCardResources = useCharacterCardResources(characterCard);
const relatedResources = useCharacterCardRelatedResources(characterCard);
</script>

<template>
  <AppScaffold :title="cardName" :subtitle="characterName">
    <v-card>
      <ResourceTabs :resources="characterCardResources" />
    </v-card>

    <CharacterCardDetailGeneral :character-card="characterCard" />

    <CharacterCardDetailGameStat :character-card="characterCard" />

    <CharacterCardDetailSkill :character-card="characterCard" />

    <v-card :title="$t('global.related_resources')">
      <ResourceTabs :resources="relatedResources" />
    </v-card>
  </AppScaffold>
</template>
