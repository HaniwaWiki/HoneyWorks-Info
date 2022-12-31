<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useCharacterCardResources } from './helper/useCharacterCardResources';
import { useNearbyPage } from './helper/useNearbyPage';
import HwplItemSourceCard from '@/components/hwpl/HwplItemSource/HwplItemSourceCard.vue';
import AppScaffold from '@/components/app/AppScaffold/AppScaffold.vue';
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
const route = useRoute();
const characterCardId = computed(() => Number(route.params.id));

// fetch data
const { item: characterCard } = useFirstOfCollection('CharacterCards', {
  Id: characterCardId.value,
});

// parse function and parsed data
const [cardName, characterName] = useCharacterCardName(characterCard);
const characterCardResources = useCharacterCardResources(characterCard);
const relatedResources = useCharacterCardRelatedResources(characterCard);
const nearbyPage = useNearbyPage(characterCardId);
</script>

<template>
  <AppScaffold
    :title="cardName"
    :subtitle="characterName"
    :nearby-page="nearbyPage"
  >
    <v-card>
      <ResourceTabs :resources="characterCardResources" />
    </v-card>

    <CharacterCardDetailGeneral :character-card="characterCard" />

    <CharacterCardDetailGameStat :character-card="characterCard" />

    <CharacterCardDetailSkill :character-card="characterCard" />

    <v-card :title="$t('global.related_resources')">
      <ResourceTabs :resources="relatedResources" />
    </v-card>

    <HwplItemSourceCard :item-id="characterCardId" />
  </AppScaffold>
</template>
