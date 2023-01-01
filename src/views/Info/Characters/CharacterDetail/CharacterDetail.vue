<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useNearbyPage } from './useNearbyPage';
import CharacterCardLazyLoadList from '@/components/assemble/CharacterCardLazyLoadList.vue';
import AppScaffold from '@/components/app/AppScaffold/AppScaffold.vue';
import { getCharacterCardImageUrl } from '@/utils/hwpl/CharacterCard/url';
import { useCollection, useFirstOfCollection } from '@/composables/useCollection';
import type { VuetifyListItem } from '@/types/vuetify/listItem';
import { parseCharacterBirthday } from '@/utils/hwpl/Character/common';
import ResourceTabs from '@/components/base/ResourceTabs/ResourceTabs.vue';

const { t } = useI18n();

// page options
const route = useRoute();
const characterId = computed(() => Number(route.params.id));

// fetch data
const { item: character } = useFirstOfCollection(ref('Characters'), computed(() => ({
  Id: characterId.value,
})));
const { collection: characterCards } = useCollection('CharacterCards', computed(() => ({
  CharacterId: characterId.value,
})));

const characterImageUrl = computed(() =>
  character.value
    ? getCharacterCardImageUrl({
      Id: character.value.DefaultCharacterCardId,
    })
    : '',
);

const listItems = computed<VuetifyListItem[]>(() => [
  {
    prependIcon: 'mdi-music-accidental-sharp',
    title: character.value?.Id,
    subtitle: t('character.id'),
  },
  {
    prependIcon: 'mdi-account',
    title: character.value?.Name,
    subtitle: t('character.name'),
  },
  {
    prependIcon: 'placeholder',
    title: character.value?.HiraganaName,
    subtitle: t('character.hiragana_name'),
  },
  {
    prependIcon: 'mdi-account-voice',
    title: character.value?.VoiceActor,
    subtitle: t('character.character_voice'),
  },
  {
    prependIcon: 'mdi-human-male-height',
    title: character.value?.Height,
    subtitle: t('character.height'),
  },
  {
    prependIcon: 'mdi-cake-variant',
    title: parseCharacterBirthday(character.value).join('/'),
    subtitle: t('character.birthday'),
  },
  {
    prependIcon: 'mdi-star-david',
    title: character.value?.Constellation,
    subtitle: t('character.constellation'),
  },
  {
    prependIcon: 'mdi-water',
    title: character.value?.BloodType,
    subtitle: t('character.blood_type'),
  },
  { type: 'divider', inset: true },
  {
    prependIcon: 'mdi-text-long',
    title: character.value?.Description.replaceAll('<br>', '\n'),
    subtitle: t('character.description'),
  },
]);

const nearbyPage = useNearbyPage(characterId);
</script>

<template>
  <AppScaffold :title="character?.Name" :nearby-page="nearbyPage">
    <v-card>
      <ResourceTabs
        :resources="[{
          name: $t('character.default_card_image'),
          key: 'image',
          url: characterImageUrl,
        }]"
      />
    </v-card>

    <v-card :title="$t('character.general')">
      <v-list
        class="icon-primary"
        :items="listItems"
        color="primary"
        item-props
        lines="two"
      >
        <template #title="{ title }">
          <div class="text-pre-wrap" v-text="title" />
        </template>
      </v-list>
    </v-card>

    <v-card
      :title="$t('character.character_cards_num_in_total', [characterCards.length])"
    >
      <v-list>
        <CharacterCardLazyLoadList :character-cards="characterCards" />
      </v-list>
    </v-card>
  </AppScaffold>
</template>
