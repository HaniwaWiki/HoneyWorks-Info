<script setup lang="ts">
import { useDisplay } from 'vuetify';
import LoadingCircle from '@/components/base/LoadingCircle.vue';
import AppScaffold from '@/components/app/AppScaffold/AppScaffold.vue';
import { getCharacterCardImageUrl } from '@/utils/hwpl/CharacterCard/url';
import HwplCharacterImageCard from '@/components/hwpl/HwplCharacterImageCard.vue';
import { useCollection } from '@/composables/useCollection';
import type { Character } from '@/types/HWPL/Character';

// page options
const { mobile } = useDisplay();

// fetch data
const { loading, collection: characters } = useCollection('Characters');

// parse function and parsed data
function getCharacterImage(character: Character) {
  return getCharacterCardImageUrl({
    Id: character.DefaultCharacterCardId,
    evolved: false,
  });
}
</script>

<template>
  <AppScaffold>
    <v-row>
      <v-col v-if="loading">
        <LoadingCircle />
      </v-col>
      <v-col v-for="character in characters" :key="character.Id" cols="3">
        <HwplCharacterImageCard
          :img-src="getCharacterImage(character)"
          :title="character.Name"
          :text-height="mobile ? '60px' : '20px'"
          :to="{ name: 'Character Detail', params: { id: character.Id } }"
        />
      </v-col>
    </v-row>
  </AppScaffold>
</template>
