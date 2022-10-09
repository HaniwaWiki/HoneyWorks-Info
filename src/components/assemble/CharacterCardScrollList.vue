<template>
  <div>
    <div :class="`switch-group-mobile-${mobile}`">
      <v-switch
        v-model="showImage"
        hide-details
        label="Show Character Image"
        color="primary"
        density="compact"
        :class="`switch-mobile-${mobile}`"
      />
      <v-switch
        v-model="showEvolved"
        hide-details
        label="Show Evolved"
        color="primary"
        density="compact"
        :class="`switch-mobile-${mobile}`"
      />
    </div>
    <ScrollableSheet class="scrollable-sheet hwpl-icon">
      <!--   show character card as icon   -->
      <template v-if="!showImage">
        <ScrollableSheetItem
          v-for="card in characterCards"
          :key="card.Id"
          class="mx-2"
        >
          <HwplIconImageCard
            ripple
            :img-src="getCardImage(card)"
            :title="parseCharacterCardName(card)[0]"
            :subtitle="parseCharacterCardName(card)[1]"
            :rarity="card.Rarity"
            :evolved="showEvolved"
            width="100px"
            text-height="72px"
            @click="goto('Character Card Detail', { id: card.Id })"
          />
        </ScrollableSheetItem>
      </template>
      <!--   show character card as image   -->
      <template v-else>
        <ScrollableSheetItem
          v-for="card in characterCards"
          :key="card.Id"
          class="mx-2"
        >
          <HwplCharacterImageCard
            ripple
            :img-src="getCardImage(card)"
            :title="parseCharacterCardName(card)[0]"
            :subtitle="parseCharacterCardName(card)[1]"
            :rarity="card.Rarity"
            :evolved="showEvolved"
            width="160px"
            text-height="64px"
            @click="goto('Character Card Detail', { id: card.Id })"
          />
        </ScrollableSheetItem>
      </template>
    </ScrollableSheet>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import { CharacterCard } from '@/types/HWPL/CharacterCard';
import ScrollableSheet from '@/components/base/ScrollableSheet/ScrollableSheet.vue';
import ScrollableSheetItem from '@/components/base/ScrollableSheet/ScrollableSheetItem.vue';
import HwplCharacterImageCard from '@/components/hwpl/HwplCharacterImageCard.vue';
import HwplIconImageCard from '@/components/hwpl/HwplIconImageCard.vue';
import { getCharacterCardImageUrl } from '@/utils/hwpl/assetUtils/url/characterCard';
import { goto } from '@/router';
import { parseCharacterCardName } from '@/utils/hwpl/characterCard';
import { useDisplay } from 'vuetify';

defineProps({
  characterCards: {
    type: Array as PropType<CharacterCard[]>,
    default: () => [],
  },
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

.scrollable-sheet {
  padding-left: 20px;
  padding-right: 20px;
}

.hwpl-icon :deep(.scrollable-sheet) {
  border-radius: 12px;
}
</style>