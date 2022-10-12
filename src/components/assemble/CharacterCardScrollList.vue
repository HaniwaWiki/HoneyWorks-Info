<template>
  <div>
    <div class="switch-group">
      <v-switch
        v-model="showImage"
        hide-details
        label="Show Character Image"
        color="primary"
      />
      <v-switch
        v-model="showEvolved"
        hide-details
        label="Show Evolved"
        color="primary"
      />
    </div>
    <ScrollableSheet :class="showImage ? '' : 'hwpl-icon'">
      <ScrollableSheetItem
        v-for="card in characterCards"
        :key="card.Id"
        class="mx-2"
      >
        <!--   show character card as icon   -->
        <HwplIconImageCard
          v-if="!showImage"
          :img-src="getCardImage(card)"
          :title="parseCharacterCardName(card)[0]"
          :subtitle="parseCharacterCardName(card)[1]"
          :rarity="card.Rarity"
          :evolved="showEvolved"
          width="100px"
          text-height="72px"
          :to="{ name: 'Character Card Detail', params: { id: card.Id } }"
        />
        <!--   show character card as image   -->
        <HwplCharacterImageCard
          v-else
          :img-src="getCardImage(card)"
          :title="parseCharacterCardName(card)[0]"
          :subtitle="parseCharacterCardName(card)[1]"
          :rarity="card.Rarity"
          :evolved="showEvolved"
          width="160px"
          text-height="64px"
          :to="{ name: 'Character Card Detail', params: { id: card.Id } }"
        />
      </ScrollableSheetItem>
    </ScrollableSheet>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CharacterCard } from '@/types/HWPL/CharacterCard';
import ScrollableSheet from '@/components/base/ScrollableSheet/ScrollableSheet.vue';
import ScrollableSheetItem from '@/components/base/ScrollableSheet/ScrollableSheetItem.vue';
import HwplCharacterImageCard from '@/components/hwpl/HwplCharacterImageCard.vue';
import HwplIconImageCard from '@/components/hwpl/HwplIconImageCard.vue';
import { getCharacterCardImageUrl } from '@/utils/hwpl/CharacterCard/url';
import { goto } from '@/router';
import { parseCharacterCardName } from '@/utils/hwpl/CharacterCard/common';
import { useDisplay } from 'vuetify';

// props definition
type Props = {
  characterCards: CharacterCard[];
};
withDefaults(defineProps<Props>(), {
  characterCards: () => [],
});

// page options
const { mobile } = useDisplay();

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

<style lang="scss" scoped>
:deep(.scrollable-container) {
  padding-left: 20px;
  padding-right: 20px;
}

.hwpl-icon :deep(.scrollable-sheet) {
  border-radius: 12px;
}
</style>
