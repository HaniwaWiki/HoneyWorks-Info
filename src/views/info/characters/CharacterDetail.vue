<template>
  <AppScaffold>
    <v-row>
      <v-col>
        <v-card>
          <v-img :src="characterImageUrl" width="150px" class="ma-auto" />
          <v-list :items="items" color="primary" item-props lines="two">
            <template #title="{ title }">
              <div class="text-pre-wrap" v-text="title" />
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </AppScaffold>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppScaffold from '@/components/app/AppScaffold.vue';
import { getCharacterCardImageUrl } from '@/utils/assetUtils/url/characterCard';
import { useRoute } from 'vue-router';
import { useFirstOfCollection } from '@/composables/useCollection';
import type { VuetifyListItem } from '@/types/vuetify/listItem';

const characterId = Number(useRoute().params.id);
const { item: character } = useFirstOfCollection(ref('Characters'), {
  Id: characterId,
});
const evolved = ref(false);

const characterImageUrl = computed(() =>
  character.value
    ? getCharacterCardImageUrl({
        Id: character.value.DefaultCharacterCardId,
        evolved: evolved.value,
      })
    : ''
);

/*
*   Id: number;
  Name: string;
  HiraganaName: string;
  VoiceActor: string;
  Height: string;
  Birthday: string;
  Constellation: string;
  BloodType: string;
  Description: string;
  ComboVoiceSoundId: number;
  DefaultCharacterCardId: number;
* */

const items = computed<VuetifyListItem[]>(() => [
  { type: 'subheader', title: 'General' },
  {
    prependIcon: 'mdi-home',
    title: character.value?.Id,
    subtitle: 'ID',
  },
  {
    prependIcon: 'mdi-home',
    title: character.value?.Name,
    subtitle: 'Name',
  },
  {
    prependIcon: 'mdi-home',
    title: character.value?.HiraganaName,
    subtitle: 'Hiragana Name',
  },
  {
    prependIcon: 'mdi-home',
    title: character.value?.VoiceActor,
    subtitle: 'Character Voice',
  },
  {
    prependIcon: 'mdi-home',
    title: character.value?.Height,
    subtitle: 'Height',
  },
  {
    prependIcon: 'mdi-home',
    title: character.value?.Birthday,
    subtitle: 'Birthday',
  },
  {
    prependIcon: 'mdi-home',
    title: character.value?.Constellation,
    subtitle: 'Constellation',
  },
  {
    prependIcon: 'mdi-home',
    title: character.value?.BloodType,
    subtitle: 'Blood Type',
  },
  { type: 'divider', inset: true },
  {
    prependIcon: 'mdi-home',
    title: character.value?.Description.replaceAll('<br>', '\n'),
    subtitle: 'Description',
  },
]);
</script>
