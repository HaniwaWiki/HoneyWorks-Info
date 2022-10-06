<template>
  <AppScaffold>
    <v-row>
      <v-col v-for="character in characters" :key="character.Id" cols="3">
        <v-card ripple @click="goto('Character Detail', { id: character.Id })">
          <v-img
            :src="getCharacterCardImageUrl(character.DefaultCharacterCardId, 1)"
            :alt="character.Name"
            class="ma-auto"
            :aspect-ratio="1 / 1.5"
          />
          <v-card-text class="text-center">
            {{ character.Name }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </AppScaffold>
</template>
<script setup lang="ts">
import AppScaffold from '@/components/AppScaffold/AppScaffold.vue';
import { callWithErrorHandling, onMounted, ref } from 'vue';
import { getCollection } from '@/api/common';
import { getCharacterCardImageUrl } from '@/utils/assetUtils/url/characterCard';
import { goto } from '@/router';
import { Character } from '@/types/HWPL/Character';

const characters = ref<Character[]>([]);

onMounted(async () => {
  console.log('CharacterList.vue: onMounted');
  characters.value = await getCollection('Characters');
});
</script>
