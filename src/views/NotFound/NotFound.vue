<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useDisplay } from 'vuetify';
import type { GetCharacterCardImageUrlParam } from '@/utils/hwpl/CharacterCard/url';
import {
  getCharacterCardImageUrl,
} from '@/utils/hwpl/CharacterCard/url';
import NotFoundText from '@/views/NotFound/components/NotFoundText.vue';

const { mdAndUp } = useDisplay();

const characterCardPairs: GetCharacterCardImageUrlParam[][] = [
  [
    { Id: 1002006, evolved: false },
    { Id: 1001015, evolved: false },
  ],
  [
    { Id: 1002006, evolved: true },
    { Id: 1001015, evolved: true },
  ],
];

const randomCharacterCardPair = ref(characterCardPairs[0]);

// choose a random character card pair every time the page is loaded
onMounted(() => {
  const randomIndex = Math.floor(Math.random() * characterCardPairs.length);
  randomCharacterCardPair.value = characterCardPairs[randomIndex];
});
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6" md="4">
        <v-img :src="getCharacterCardImageUrl(randomCharacterCardPair[0])" />
      </v-col>
      <NotFoundText v-if="mdAndUp" cols="4" />
      <v-col cols="6" md="4">
        <v-img :src="getCharacterCardImageUrl(randomCharacterCardPair[1])" />
      </v-col>
      <NotFoundText v-if="!mdAndUp" cols="12" />
    </v-row>
  </v-container>
</template>
