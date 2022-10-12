<template>
  <AppScaffold>
    <div>
      <div class="text-h3 mb-4">{{ cardName }}</div>
      <div class="text-h5 text-grey">{{ characterName }}</div>
    </div>

    <v-card>
      <ResourceTabs :resources="characterCardResources" />
    </v-card>

    <CharacterDetailGeneral :character-card="characterCard" />

    <CharacterDetailGameStat :character-card="characterCard" />

    <v-card title="Skill"></v-card>

    <v-card title="Related Resources">
      <ResourceTabs :resources="relatedResources" />
    </v-card>
  </AppScaffold>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppScaffold from '@/components/app/AppScaffold.vue';
import { useRoute } from 'vue-router';
import { useFirstOfCollection } from '@/composables/useCollection';
import { useCharacterCardName } from '@/composables/hwpl/useCharacterCardName';
import ResourceTabs from '@/components/base/ResourceTabs/ResourceTabs.vue';
import { useCharacterCardImageResources } from '@/views/info/CharacterCards/CharacterCardDetail/helper/useCharacterCardImageResources';
import { useCharacterCardRelatedResources } from '@/views/info/CharacterCards/CharacterCardDetail/helper/useCharacterCardRelatedResources';
import CharacterDetailGeneral from '@/views/info/CharacterCards/CharacterCardDetail/helper/CharacterDetailGeneral.vue';
import CharacterDetailGameStat from '@/views/info/CharacterCards/CharacterCardDetail/helper/CharacterDetailGameStat.vue';

// page options
const characterCardId = Number(useRoute().params.id);

// fetch data
const { item: characterCard } = useFirstOfCollection(ref('CharacterCards'), {
  Id: characterCardId,
});

// parse function and parsed data
const [cardName, characterName] = useCharacterCardName(characterCard);
const characterCardResources = useCharacterCardImageResources(characterCard);
const relatedResources = useCharacterCardRelatedResources(characterCard);
</script>
