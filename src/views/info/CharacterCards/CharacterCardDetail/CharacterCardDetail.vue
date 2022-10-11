<template>
  <AppScaffold>
    <div>
      <div class="text-h3 mb-4">{{ cardName }}</div>
      <div class="text-h5 text-grey">{{ characterName }}</div>
    </div>

    <v-card>
      <ResourceTabs :resources="characterCardResources" />
    </v-card>

    <v-card title="General">
      <v-list class="icon-primary" color="primary" item-props lines="two">
        <v-list-item prepend-icon="mdi-music-accidental-sharp" subtitle="ID">
          <template #title> {{ characterCard?.Id }} </template>
        </v-list-item>
        <v-list-item prepend-icon="mdi-text-short" subtitle="Card Name">
          <template #title> {{ characterCard?.Name }} </template>
        </v-list-item>
        <v-list-item prepend-icon="mdi-account" subtitle="Character">
          <template #title>{{ characterName }} </template>
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
      </v-list>
    </v-card>

    <v-card title="GameStat"></v-card>

    <!--    <v-card title="Skill"></v-card>-->

    <v-card title="Related Resources">
      <ResourceTabs :resources="relatedResources" />
    </v-card>
  </AppScaffold>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppScaffold from '@/components/app/AppScaffold.vue';
import { useRoute } from 'vue-router';
import { useFirstOfCollection } from '@/composables/useCollection';
import { useCharacterCardName } from '@/composables/hwpl/useCharacterCardName';
import ResourceTabs from '@/components/base/ResourceTabs/ResourceTabs.vue';
import ButtonIconLink from '@/components/base/ButtonIconLink.vue';
import star from '@/assets/rarity_star_1.png';
import HwplTagGroup from '@/components/hwpl/HwplTag/HwplTagGroup.vue';
import { useCharacterCardImageResources } from '@/views/info/CharacterCards/CharacterCardDetail/helper/useCharacterCardImageResources';
import { useCharacterCardRelatedResources } from '@/views/info/CharacterCards/CharacterCardDetail/helper/useCharacterCardRelatedResources';

// page options
const characterCardId = Number(useRoute().params.id);

// fetch data
const { item: characterCard } = useFirstOfCollection(ref('CharacterCards'), {
  Id: characterCardId,
});

// parse function and parsed data
const [cardName, characterName] = useCharacterCardName(characterCard);
const characterCardResources = useCharacterCardImageResources(characterCard);
const relatedResources = useCharacterCardRelatedResources(characterCard);
</script>
