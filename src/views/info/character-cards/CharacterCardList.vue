<template>
  <AppScaffold>
    <v-row justify="center">
      <v-col cols="12">
        <v-text-field
          v-model="keyword"
          class="no-detail"
          prepend-icon="mdi-magnify"
          required
        />
      </v-col>
      <v-col cols="6" class="d-flex flex-column align-center">
        <v-switch
          v-model="showImage"
          class="no-detail"
          label="Show Character Image"
          color="primary"
        />
      </v-col>
      <v-col cols="6" class="d-flex flex-column align-center">
        <v-switch
          v-model="showEvolved"
          class="no-detail"
          label="Show Evolved"
          color="primary"
        />
      </v-col>
    </v-row>
    <v-row>
      <!--   show character card as icon   -->
      <template v-if="!showImage">
        <v-col v-for="card in paginatedData" :key="card.Id" :cols="4" md="2">
          <HwplIconCard
            v-if="!showImage"
            ripple
            :img-src="
              getCharacterCardImageUrl(card.Id, showEvolved ? 2 : 1, true)
            "
            :title="card.cardName"
            :subtitle="card.characterName"
            :rarity="card.Rarity"
            :evolved="showEvolved"
            height="64px"
            @click="goto('Character Card Detail', { id: card.Id })"
          >
          </HwplIconCard>
        </v-col>
      </template>
      <!--   show character card as image   -->
      <template v-else>
        <v-col v-for="card in paginatedData" :key="card.Id" cols="6" md="3">
          <HwplCharacterCard
            ripple
            :img-src="getCharacterCardImageUrl(card.Id, showEvolved ? 2 : 1)"
            :title="card.cardName"
            :subtitle="card.characterName"
            :rarity="card.Rarity"
            :evolved="showEvolved"
            height="96px"
            @click="goto('Character Card Detail', { id: card.Id })"
          >
          </HwplCharacterCard>
        </v-col>
      </template>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-pagination
          v-model="page"
          active-color="primary"
          :length="pageCount"
        />
      </v-col>
    </v-row>
  </AppScaffold>
</template>
<script setup lang="ts">
import AppScaffold from '@/components/app/AppScaffold/AppScaffold.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { getCollection } from '@/api/common';
import { getCharacterCardImageUrl } from '@/utils/assetUtils/url/characterCard';
import { goto } from '@/router';
import { CharacterCard } from '@/types/HWPL/CharacterCard';
import { usePagination } from '@/composables/usePagination';
import { useFilter } from '@/composables/useFilter';
import HwplCharacterCard from '@/components/hwpl/HwplCharacterCard.vue';
import HwplIconCard from '@/components/hwpl/HwplIconCard.vue';

const characterCards = ref<
  (CharacterCard & {
    cardName: string;
    characterName: string;
  })[]
>([]);
const keyword = ref('');
const showImage = ref(false);
const showEvolved = ref(false);

// filter and pagination
const filteredData = useFilter(characterCards, keyword);
const pageSize = computed(() => (showImage.value ? 20 : 24));
const { pageCount, page, paginatedData } = usePagination(
  filteredData,
  pageSize
);

// fetch character cards on mount
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
.character-card-textarea {
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
