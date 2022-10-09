<template>
  <AppScaffold placeholder-height="0">
    <v-row justify="center">
      <v-col cols="12">
        <v-text-field
          v-model="keyword"
          hide-details
          prepend-icon="mdi-magnify"
          required
        />
      </v-col>
      <v-col cols="12" :class="`switch-group-mobile-${mobile}`">
        <v-switch
          v-model="showImage"
          hide-details
          label="Show Character Image"
          color="primary"
          :class="`switch-mobile-${mobile}`"
        />
        <v-switch
          v-model="showEvolved"
          hide-details
          label="Show Evolved"
          color="primary"
          :class="`switch-mobile-${mobile}`"
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
          :cols="4"
          md="2"
        >
          <HwplIconImageCard
            v-if="!showImage"
            ripple
            :img-src="getCardImage(card)"
            :title="parseCharacterCardName(card)[0]"
            :subtitle="parseCharacterCardName(card)[1]"
            :rarity="card.Rarity"
            :evolved="showEvolved"
            text-height="72px"
            @click="goto('Character Card Detail', { id: card.Id })"
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
            ripple
            :img-src="getCardImage(card)"
            :title="parseCharacterCardName(card)[0]"
            :subtitle="parseCharacterCardName(card)[1]"
            :rarity="card.Rarity"
            :evolved="showEvolved"
            text-height="96px"
            @click="goto('Character Card Detail', { id: card.Id })"
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
<script setup lang="ts">
import AppScaffold from '@/components/app/AppScaffold.vue';
import { computed, ref } from 'vue';
import { getCharacterCardImageUrl } from '@/utils/hwpl/assetUtils/url/characterCard';
import { goto } from '@/router';
import { CharacterCard } from '@/types/HWPL/CharacterCard';
import { usePagination } from '@/composables/usePagination';
import { useFilter } from '@/composables/useFilter';
import HwplCharacterImageCard from '@/components/hwpl/HwplCharacterImageCard.vue';
import HwplIconImageCard from '@/components/hwpl/HwplIconImageCard.vue';
import { useCollection } from '@/composables/useCollection';
import { parseCharacterCardName } from '@/utils/hwpl/characterCard';
import { useDisplay } from 'vuetify';

// page options
const { mobile } = useDisplay();

// options from user
const keyword = ref('');
const showImage = ref(false);
const showEvolved = ref(false);

// fetch, filter and paginate data
const { loading, collection: characterCards } = useCollection('CharacterCards');
const filteredCharacterCards = useFilter(characterCards, keyword);
const pageSize = computed(() => (showImage.value ? 20 : 24));
const {
  pageCount,
  page,
  paginatedData: paginatedCharacterCards,
} = usePagination(filteredCharacterCards, pageSize);

// utility functions for rendering
function getCardImage(characterCard: CharacterCard) {
  return getCharacterCardImageUrl({
    Id: characterCard.Id,
    evolved: showEvolved.value,
    icon: !showImage.value,
  });
}
</script>

<style lang="scss" scoped>
.switch-group {
  &-mobile-false {
    display: flex;
  }
}

.switch {
  &-mobile-true {
    padding-left: 32px;
    padding-right: 32px;
  }
  &-mobile-false {
    padding-left: 80px;
    padding-right: 80px;
  }
}
</style>
