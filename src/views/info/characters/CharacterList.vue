<template>
  <AppScaffold>
    <v-row>
      <v-col v-if="loading" class="text-center">
        <v-progress-circular indeterminate color="primary" />
      </v-col>
      <v-col v-for="character in characters" :key="character.Id" cols="3">
        <HwplCharacterCard
          :img-src="getCharacterImage(character)"
          :title="character.Name"
          @click="goto('Character Detail', { id: character.Id })"
        />
      </v-col>
    </v-row>
  </AppScaffold>
</template>
<script setup lang="ts">
import AppScaffold from '@/components/app/AppScaffold/AppScaffold.vue';
import { getCharacterCardImageUrl } from '@/utils/assetUtils/url/characterCard';
import { goto } from '@/router';
import HwplCharacterCard from '@/components/hwpl/HwplCharacterCard.vue';
import { useCollection } from '@/composables/useCollection';
import { Character } from '@/types/HWPL/Character';

const { loading, collection: characters } = useCollection('Characters');

function getCharacterImage(character: Character) {
  return getCharacterCardImageUrl({
    Id: character.DefaultCharacterCardId,
    evolved: false,
  });
}
</script>
