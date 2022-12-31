<script setup lang='ts'>
import { computed, ref, watchEffect } from 'vue';
import _ from 'lodash';
import { getGachaProbability } from '../../../../../api/getExtraApi';
import asyncComputed from '../../../../../utils/asyncComputed';
import type { GachaProbabilityPack } from '../../../../../types/HWPL/extra/GachaProbabilityPack';
import { useCollection } from '../../../../../composables/useCollection';
import HwplItemIconCard from '../../../../../components/hwpl/HwplItemIconCard.vue';
import LazyLoadList from '../../../../../components/assemble/LazyLoadList.vue';
import LoadingCircle from '../../../../../components/base/LoadingCircle.vue';
import RarityStar from '../../../../../assets/rarity_star/RarityStar.vue';
import { getCharacterCardImageUrl } from '@/utils/hwpl/CharacterCard/url';

const props = defineProps<{ gachaBoxId: number; }>();

const showEvolved = ref(true);
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
const sortedProbabilities = computed(() => {
  return _.sortBy(probabilities.value, p => -p.Probability);
});
const rarityToGachaProbabilities = computed(() =>
  _.groupBy(
    sortedProbabilities.value,
    probability => characterCardMap.value[probability.ItemId]?.Rarity,
  ),
);
const rarityList = computed(() =>
  Object.keys(rarityToGachaProbabilities.value)
    .filter(v => v !== 'undefined')
    .map(Number)
    .sort()
    .reverse(),
);
</script>

<template>
  <v-card :title="$t('gacha.probability_overview')">
    <v-row justify="space-between">
      <v-col>
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
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-switch
          v-model="showEvolved"
          class="mx-3"
          hide-details
          :label="$t('character_card.show_evolved')"
          color="primary"
          density="comfortable"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <LoadingCircle v-if="rarityList.length === 0" />
        <v-expansion-panels v-else>
          <v-expansion-panel v-for="rarity in rarityList" :key="rarity">
            <v-expansion-panel-title>
              <v-row no-gutters>
                <v-col cols="6">
                  <RarityStar
                    v-for="i in Array(rarity)"
                    :key="i"
                    class="d-inline-block"
                    width="20px"
                  />
                </v-col>
                <v-col cols="6" class="text-grey d-flex align-center justify-end">
                  <div>
                    {{ rarityProbabilities.find(r => r.Rarity === rarity)?.Probability }}%
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-row>
                <LazyLoadList
                  :page-size="12"
                  :items="rarityToGachaProbabilities[rarity]"
                  :item-key="probability => probability.ItemId"
                >
                  <template #default="{ item: probability }">
                    <v-col :cols="4" :md="3">
                      <HwplItemIconCard
                        class="mx-auto"
                        :img-src="getCharacterCardImageUrl({ Id: probability.ItemId, evolved: showEvolved, icon: true })"
                        :evolved="showEvolved"
                        :rarity="characterCardMap[probability.ItemId]?.Rarity"
                        :to="{ name: 'Character Card Detail', params: { id: probability.ItemId } }"
                        :title="`${probability.Probability}%`"
                        text-height="16px"
                      />
                    </v-col>
                  </template>
                </LazyLoadList>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-card>
</template>
