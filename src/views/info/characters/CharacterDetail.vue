<template>
  <AppScaffold>
    <v-row>
      <v-col>
        <div class="text-h3">{{ character?.Name }}</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-img :src="characterImageUrl" width="150px" class="ma-auto" />
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
          <v-list>
            <v-list-subheader
              :title="`Character Cards (${characterCards.length} in total)`"
            />
            <CharacterCardScrollList :character-cards="characterCards" />
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </AppScaffold>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppScaffold from '@/components/app/AppScaffold.vue';
import { getCharacterCardImageUrl } from '@/utils/hwpl/assetUtils/url/characterCard';
import { useRoute } from 'vue-router';
import {
  useCollection,
  useFirstOfCollection,
} from '@/composables/useCollection';
import type { VuetifyListItem } from '@/types/vuetify/listItem';
import { MdiIcons } from '@/types/mdi';
import { parseCharacterBirthday } from '@/utils/hwpl/character';
import CharacterCardScrollList from '@/components/assemble/CharacterCardScrollList.vue';

const characterId = Number(useRoute().params.id);

// fetch data
const { item: character } = useFirstOfCollection(ref('Characters'), {
  Id: characterId,
});
const { collection: characterCards } = useCollection('CharacterCards', {
  CharacterId: characterId,
});

const characterImageUrl = computed(() =>
  character.value
    ? getCharacterCardImageUrl({
        Id: character.value.DefaultCharacterCardId,
      })
    : ''
);

const listItems = computed<VuetifyListItem[]>(() => [
  { type: 'subheader', title: 'General' },
  {
    prependIcon: 'mdi-music-accidental-sharp',
    title: character.value?.Id,
    subtitle: 'ID',
  },
  {
    prependIcon: 'mdi-account',
    title: character.value?.Name,
    subtitle: 'Name',
  },
  {
    prependIcon: 'mdi-place_holder' as MdiIcons,
    title: character.value?.HiraganaName,
    subtitle: 'Hiragana Name',
  },
  {
    prependIcon: 'mdi-account-voice',
    title: character.value?.VoiceActor,
    subtitle: 'Character Voice',
  },
  {
    prependIcon: 'mdi-human-male-height',
    title: character.value?.Height,
    subtitle: 'Height',
  },
  {
    prependIcon: 'mdi-cake-variant',
    // todo use date-fns to parse date
    title: character.value
      ? parseCharacterBirthday(character.value).join('/')
      : '',
    subtitle: 'Birthday',
  },
  {
    prependIcon: 'mdi-star-david',
    title: character.value?.Constellation,
    subtitle: 'Constellation',
  },
  {
    prependIcon: 'mdi-water',
    title: character.value?.BloodType,
    subtitle: 'Blood Type',
  },
  { type: 'divider', inset: true },
  {
    prependIcon: 'mdi-text-long',
    title: character.value?.Description.replaceAll('<br>', '\n'),
    subtitle: 'Description',
  },
  { type: 'divider', inset: true },
]);
</script>
