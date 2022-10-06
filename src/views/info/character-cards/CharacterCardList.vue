<template>
  <AppScaffold>
    <v-row justify="end">
      <v-col>
        <v-switch
          v-model="showEvolved"
          label="After Evolution"
          color="primary"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="card in characterCards" :key="card.Id" cols="3">
        <v-card ripple @click="goto('Character Card Detail', { id: card.Id })">
          <v-img
            :src="getCharacterCardImageUrl(card.Id, showEvolved ? 2 : 1)"
            :alt="card.Name"
            class="ma-auto"
            :aspect-ratio="1 / 1.5"
          />
          <v-card-text class="text-center text-pre-wrap">
            {{ card.Name }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </AppScaffold>
</template>
<script setup lang="ts">
import AppScaffold from '@/components/AppScaffold/AppScaffold.vue';
import { onMounted, ref } from 'vue';
import { getCollection } from '@/api/common';
import { getCharacterCardImageUrl } from '@/utils/assetUtils/url/characterCard';
import { goto } from '@/router';
import { Character } from '@/types/HWPL/Character';
import { CharacterCard } from '@/types/HWPL/CharacterCard';

const characterCards = ref<CharacterCard[]>([]);
const showEvolved = ref(false);

onMounted(async () => {
  console.log('CharacterCardList.vue: onMounted');
  characterCards.value = (await getCollection('CharacterCards')).map(
    (card) => ({
      ...card,
      Name: card.Name.replace('】', '】\n'),
    })
  );
});
</script>
