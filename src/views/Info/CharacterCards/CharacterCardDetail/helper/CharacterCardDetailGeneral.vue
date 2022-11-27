<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { CharacterCard } from '@/types/HWPL/CharacterCard';
import ButtonIconLink from '@/components/base/ButtonIconLink.vue';
import star from '@/assets/rarity_star_1.png';
import HwplTagGroup from '@/components/hwpl/HwplTag/HwplTagGroup.vue';
import { parseCharacterCardName } from '@/utils/hwpl/CharacterCard/common';
import asyncComputed from '@/utils/asyncComputed';
import { getItemSourceAggregateInformation } from '@/api/itemSource';

const props = defineProps<{
  characterCard: CharacterCard | null;
}>();

const { d, t } = useI18n();

const itemSourceAggregateInformation = asyncComputed(
  getItemSourceAggregateInformation,
  [],
);
const releaseTime = computed(() => {
  const releaseTimestamp = itemSourceAggregateInformation.value.find(
    info => info.ItemId === props.characterCard?.Id,
  )?.ReleaseTimestamp;
  return releaseTimestamp
    ? d(new Date(releaseTimestamp * 1000), 'long')
    : t('global.unknown');
});
</script>

<template>
  <v-card :title="$t('character_card.general')">
    <v-list class="icon-primary" color="primary" item-props lines="two">
      <v-list-item
        prepend-icon="mdi-music-accidental-sharp"
        :subtitle="$t('character_card.id')"
      >
        <template #title>
          {{ characterCard?.Id }}
        </template>
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-text-short"
        :subtitle="$t('character_card.card_name')"
      >
        <template #title>
          {{ characterCard?.Name }}
        </template>
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-account"
        :subtitle="$t('global.character')"
      >
        <template #title>
          {{ parseCharacterCardName(characterCard)[1] }}
        </template>
        <template #append>
          <ButtonIconLink
            v-if="characterCard"
            size="small"
            :to="{
              name: 'Character Detail',
              params: { id: characterCard.CharacterId },
            }"
          />
        </template>
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-star"
        :subtitle="$t('character_card.rarity')"
      >
        <template #title>
          <template v-if="characterCard">
            <v-img
              v-for="i in Array(characterCard.Rarity)"
              :key="i"
              class="d-inline-block"
              :src="star"
              width="20px"
            />
          </template>
        </template>
      </v-list-item>
      <v-list-item prepend-icon="mdi-tag" :subtitle="$t('global.tags')">
        <template #title>
          <HwplTagGroup
            v-if="characterCard"
            :tag-ids="characterCard.TagIdBits"
          />
        </template>
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-calendar"
        :subtitle="$t('character_card.release_time')"
      >
        <template #title>
          {{ releaseTime }}
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>
