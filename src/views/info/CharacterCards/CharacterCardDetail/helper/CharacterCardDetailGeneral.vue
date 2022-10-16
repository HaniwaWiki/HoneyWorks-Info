<template>
  <v-card title="General">
    <v-list class="icon-primary" color="primary" item-props lines="two">
      <v-list-item prepend-icon="mdi-music-accidental-sharp" subtitle="ID">
        <template #title> {{ characterCard?.Id }} </template>
      </v-list-item>
      <v-list-item prepend-icon="mdi-text-short" subtitle="Card Name">
        <template #title> {{ characterCard?.Name }} </template>
      </v-list-item>
      <v-list-item prepend-icon="mdi-account" subtitle="Character">
        <template #title
          >{{ parseCharacterCardName(characterCard)[1] }}
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
      <v-list-item prepend-icon="mdi-star" subtitle="Rarity">
        <template #title>
          <template v-if="characterCard">
            <v-img
              v-for="i in Array(characterCard.Rarity)"
              :key="i"
              class="d-inline-block"
              :src="star"
              width="20px"
            ></v-img>
          </template>
        </template>
      </v-list-item>
      <v-list-item prepend-icon="mdi-tag" subtitle="Tags">
        <template #title>
          <HwplTagGroup
            v-if="characterCard"
            :tag-ids="characterCard.TagIdBits"
          />
        </template>
      </v-list-item>
      <v-list-item prepend-icon="mdi-calendar" subtitle="Release Time">
        <template #title> {{ releaseTime }} </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { CharacterCard } from '@/types/HWPL/CharacterCard';
import ButtonIconLink from '@/components/base/ButtonIconLink.vue';
import star from '@/assets/rarity_star_1.png';
import HwplTagGroup from '@/components/hwpl/HwplTag/HwplTagGroup.vue';
import { parseCharacterCardName } from '@/utils/hwpl/CharacterCard/common';
import asyncComputed from '@/utils/asyncComputed';
import { getItemSourceAggregateInformation } from '@/api/itemSource';
import { computed } from 'vue';

const props = defineProps<{
  characterCard: CharacterCard | null;
}>();
const itemSourceAggregateInformation = asyncComputed(
  getItemSourceAggregateInformation,
  []
);
const releaseTime = computed(() => {
  const releaseTimestamp = itemSourceAggregateInformation.value.find(
    (info) => info.ItemId === props.characterCard?.Id
  )?.ReleaseTimestamp;
  return releaseTimestamp
    ? new Date(releaseTimestamp * 1000).toLocaleString()
    : 'Unknown';
});
</script>
