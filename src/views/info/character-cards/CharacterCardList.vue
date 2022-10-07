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
          <v-card-text class="character-card-title">
            <div>{{ card.cardName }}</div>
            <div class="text-grey character-card-subtitle">
              {{ card.characterName }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </AppScaffold>
</template>
<script setup lang="ts">
import AppScaffold from '@/components/app/AppScaffold/AppScaffold.vue';
import { onMounted, ref } from 'vue';
import { getCollection } from '@/api/common';
import { getCharacterCardImageUrl } from '@/utils/assetUtils/url/characterCard';
import { goto } from '@/router';
import { Character } from '@/types/HWPL/Character';
import { CharacterCard } from '@/types/HWPL/CharacterCard';

const characterCards = ref<
  (CharacterCard & {
    cardName: string;
    characterName: string;
  })[]
>([]);
const showEvolved = ref(false);

onMounted(async () => {
  characterCards.value = (await getCollection('CharacterCards')).map((card) => {
    const [, cardName, characterName] = /【(.*)】(.*)/.exec(card.Name) ?? [];
    return {
      ...card,
      cardName,
      characterName,
    };
  });
});
</script>

<style lang="scss" scoped>
.character-card-title {
  // ensure the height is enough to place 3 lines of name
  height: 60 + 32px;

  // horizontal align title and subtitle
  text-align: center;
  white-space: pre-wrap;

  // vertical align title and subtitle
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.character-card-subtitle {
  font-size: 0.5rem;
}
</style>
