<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCharacterCardListViewStore } from '../../../../stores/views/characterCardList';
import { useSortCharacterCards } from './helper/useSortCharacterCards';
import AppScaffold from '@/components/app/AppScaffold.vue';
import { getCharacterCardImageUrl } from '@/utils/hwpl/CharacterCard/url';
import type { CharacterCard } from '@/types/HWPL/CharacterCard';
import { usePagination } from '@/composables/usePagination';
import { useKeywordFilter } from '@/composables/useKeywordFilter';
import HwplCharacterImageCard from '@/components/hwpl/HwplCharacterImageCard.vue';
import HwplIconImageCard from '@/components/hwpl/HwplIconImageCard.vue';
import { useCollection } from '@/composables/useCollection';
import { parseCharacterCardName } from '@/utils/hwpl/CharacterCard/common';

// options from user
const { keyword, sortBy, showImage, showEvolved } = storeToRefs(useCharacterCardListViewStore());

// fetch, filter and paginate data
const { loading, collection: characterCards } = useCollection('CharacterCards');
const filteredCharacterCards = useKeywordFilter(characterCards, keyword);
const sortedCharacterCards = useSortCharacterCards(
  filteredCharacterCards,
  sortBy,
);
const pageSize = 24;
const {
  pageCount,
  page,
  paginatedData: paginatedCharacterCards,
} = usePagination(sortedCharacterCards, pageSize);

// parse function and parsed data
function getCardImage(characterCard: CharacterCard) {
  return getCharacterCardImageUrl({
    Id: characterCard.Id,
    evolved: showEvolved.value,
    icon: !showImage.value,
  });
}
</script>

<template>
  <AppScaffold md="12" lg="8" placeholder-height="0">
    <v-row justify="center">
      <v-col cols="12" class="d-flex align-center">
        <v-text-field
          v-model="keyword"
          class="mr-4"
          hide-details
          prepend-icon="mdi-magnify"
          required
        />
        <v-btn
          prepend-icon="mdi-filter-variant"
          @click="keyword += ' &quot;Rarity&quot;:5'"
        >
          {{ $t('character_card.rarity') }}
        </v-btn>
      </v-col>
      <v-col cols="12" class="switch-group">
        <v-radio-group v-model="sortBy" color="primary" inline hide-details>
          <div v-t="'character_card.sort_by_colon'" />
          <v-radio
            :label="$t('character_card.default')"
            value="Default"
          />
          <v-radio
            :label="$t('character_card.ability')"
            value="Ability"
          />
          <v-radio
            :label="$t('character_card.release_date')"
            value="ReleaseTimestamp"
          />
        </v-radio-group>
        <v-switch
          v-model="showImage"
          hide-details
          :label="$t('character_card.show_character_image')"
          color="primary"
          density="comfortable"
        />
        <v-switch
          v-model="showEvolved"
          hide-details
          :label="$t('character_card.show_evolved')"
          color="primary"
          density="comfortable"
        />
      </v-col>
    </v-row>
    <v-col v-if="loading" class="text-center">
      <v-progress-circular indeterminate color="primary" />
    </v-col>
    <v-row>
      <!--   show character card as icon   -->
      <template v-if="!showImage">
        <v-col
          v-for="card in paginatedCharacterCards"
          :key="card.Id"
          cols="4"
          md="2"
        >
          <HwplIconImageCard
            v-if="!showImage"
            :img-src="getCardImage(card)"
            :title="parseCharacterCardName(card)[0]"
            :subtitle="parseCharacterCardName(card)[1]"
            :rarity="card.Rarity"
            :evolved="showEvolved"
            width="auto"
            text-height="72px"
            :to="{ name: 'Character Card Detail', params: { id: card.Id } }"
          />
        </v-col>
      </template>
      <!--   show character card as image   -->
      <template v-else>
        <v-col
          v-for="card in paginatedCharacterCards"
          :key="card.Id"
          cols="6"
          md="3"
        >
          <HwplCharacterImageCard
            :img-src="getCardImage(card)"
            :title="parseCharacterCardName(card)[0]"
            :subtitle="parseCharacterCardName(card)[1]"
            :rarity="card.Rarity"
            :evolved="showEvolved"
            text-height="96px"
            :to="{ name: 'Character Card Detail', params: { id: card.Id } }"
          />
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

<style lang="scss" scoped>
.v-radio-group :deep(.v-selection-control-group--inline) {
  align-items: center;
  margin-left: 40px;
}
</style>
