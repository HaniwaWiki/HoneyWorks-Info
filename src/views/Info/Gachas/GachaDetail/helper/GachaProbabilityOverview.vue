<script setup lang='ts'>
import { computed, ref } from 'vue';
import _ from 'lodash';
import { getGachaProbability } from '../../../../../api/extra';
import asyncComputed from '../../../../../utils/asyncComputed';
import type { GachaProbabilityPack } from '../../../../../types/HWPL/extra/GachaProbabilityPack';
import { useCollection } from '../../../../../composables/useCollection';
import HwplItemIconCard from '../../../../../components/hwpl/HwplItemIconCard.vue';
import star from '@/assets/rarity_star_1.png';
import { getCharacterCardImageUrl } from '@/utils/hwpl/CharacterCard/url';

const props = defineProps<{ gachaBoxId: number; }>();

const payType = ref<'usual' | 'confirmed' | 'paid'>('usual');

const defaultGachaProbabilities: GachaProbabilityPack = {
  Probabilities: [],
  ConvertedProbabilities: [],
  ConvertedPremiumProbabilities: [],
  RarityProbabilities: [],
  ConvertedRarityProbabilities: [],
  ConvertedPremiumRarityProbabilities: [],
};
const gachaProbabilities = asyncComputed(async () => getGachaProbability(props.gachaBoxId), defaultGachaProbabilities);
const { collection: characterCards } = useCollection('CharacterCards');

const probabilities = computed(() => {
  switch (payType.value) {
    case 'usual':
      return gachaProbabilities.value.Probabilities;
    case 'confirmed':
      return gachaProbabilities.value.ConvertedProbabilities;
    case 'paid':
      return gachaProbabilities.value.ConvertedPremiumProbabilities;
    default:
      return [];
  }
});
const rarityProbabilities = computed(() => {
  switch (payType.value) {
    case 'usual':
      return gachaProbabilities.value.RarityProbabilities;
    case 'confirmed':
      return gachaProbabilities.value.ConvertedRarityProbabilities;
    case 'paid':
      return gachaProbabilities.value.ConvertedPremiumRarityProbabilities;
    default:
      return [];
  }
});

const characterCardMap = computed(() => _.keyBy(characterCards.value, 'Id'));
const sortedProbabilities = computed(() => _.sortBy(probabilities.value, 'Probability').reverse());
const rarityToCharacterCards = computed(() =>
  _.groupBy(sortedProbabilities.value, ({ ItemId }) => characterCardMap.value[ItemId]?.Rarity),
);
const rarityList = computed(() => Object.keys(rarityToCharacterCards.value)
  .map(Number)
  .filter(value => !!value)
  .reverse(),
);
</script>

<template>
  <div v-t="'gacha.probability_overview'" class="v-card-title" />
  <v-radio-group v-model="payType" color="primary" inline hide-details>
    <v-radio
      v-if="gachaProbabilities.Probabilities.length > 0"
      :label="$t('gacha.usual')"
      value="usual"
    />
    <v-radio
      v-if="gachaProbabilities.ConvertedProbabilities.length > 0"
      :label="$t('gacha.confirmed')"
      value="confirmed"
    />
    <v-radio
      v-if="gachaProbabilities.ConvertedPremiumProbabilities.length > 0"
      :label="$t('gacha.paid')"
      value="paid"
    />
  </v-radio-group>
  <v-expansion-panels>
    <v-expansion-panel v-for="rarity in rarityList" :key="rarity">
      <v-expansion-panel-title>
        <v-row no-gutters>
          <v-col cols="4">
            <v-img
              v-for="i in Array(rarity)"
              :key="i"
              class="d-inline-block"
              :src="star"
              width="20px"
            />
          </v-col>
          <v-col cols="8" class="text-grey d-flex align-center  justify-end">
            <div>
              {{ rarityProbabilities.find(r => r.Rarity === rarity)?.Probability }}%
            </div>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row>
          <v-col
            v-for="{ ItemId, Probability } in rarityToCharacterCards[rarity]"
            :key="ItemId"
            :cols="4"
            :md="3"
          >
            <HwplItemIconCard
              :img-src="getCharacterCardImageUrl({ Id: ItemId, icon: true })"
              :rarity="characterCardMap[ItemId]?.Rarity"
              :to="{ name: 'Character Card Detail', params: { id: ItemId } }"
              :title="`${Probability}%`"
              text-height="16px"
              class="mx-auto"
            />
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
