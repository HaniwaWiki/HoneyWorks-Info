<script setup lang="ts">
import { ref } from 'vue';
import LazyLoadList from './LazyLoadList.vue';
import type { CharacterCard } from '@/types/HWPL/CharacterCard';
import HwplCharacterImageCard from '@/components/hwpl/HwplCharacterImageCard.vue';
import HwplItemIconCard from '@/components/hwpl/HwplItemIconCard.vue';
import { getCharacterCardImageUrl } from '@/utils/hwpl/CharacterCard/url';
import { parseCharacterCardName } from '@/utils/hwpl/CharacterCard/common';

// props definition
type Props = {
  characterCards: CharacterCard[];
};
withDefaults(defineProps<Props>(), {
  characterCards: () => [],
});

// options from user
const showImage = ref(false);
const showEvolved = ref(false);

// utility functions for rendering
function getCardImage(characterCard: CharacterCard) {
  return getCharacterCardImageUrl({
    Id: characterCard.Id,
    evolved: showEvolved.value,
    icon: !showImage.value,
  });
}
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="switch-group">
            <v-switch
              v-model="showImage"
              hide-details
              :label="$t('character_card.show_character_image')"
              color="primary"
            />
            <v-switch
              v-model="showEvolved"
              hide-details
              :label="$t('character_card.show_evolved')"
              color="primary"
            />
          </div>
        </v-col>
      </v-row>

      <v-row>
        <LazyLoadList :page-size="12" :items="characterCards" :item-key="card => card.Id">
          <template #default="{ item: card }">
            <!--   show character card as icon   -->
            <v-col
              v-if="!showImage"
              cols="4"
              md="3"
            >
              <HwplItemIconCard
                class="mx-auto"
                :img-src="getCardImage(card)"
                :title="parseCharacterCardName(card)[0]"
                :subtitle="parseCharacterCardName(card)[1]"
                :rarity="card.Rarity"
                :evolved="showEvolved"
                width="100px"
                text-height="72px"
                :to="{ name: 'Character Card Detail', params: { id: card.Id } }"
              />
            </v-col>
            <!--   show character card as image   -->
            <v-col
              v-else
              cols="6"
              md="3"
            >
              <HwplCharacterImageCard
                clas="mx-auto"
                :img-src="getCardImage(card)"
                :title="parseCharacterCardName(card)[0]"
                :subtitle="parseCharacterCardName(card)[1]"
                :rarity="card.Rarity"
                :evolved="showEvolved"
                width="160px"
                text-height="64px"
                :to="{ name: 'Character Card Detail', params: { id: card.Id } }"
              />
            </v-col>
          </template>
        </LazyLoadList>
      </v-row>
    </v-container>
  </div>
</template>
