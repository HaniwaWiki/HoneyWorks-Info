<template>
  <AppScaffold>
    <v-row>
      <v-col
        v-for="character in characters"
        :key="character.Id"
        cols="6"
        md="3"
      >
        <HwplCharacterCard
          :img-src="
            getCharacterCardImageUrl(character.DefaultCharacterCardId, 1)
          "
          :title="character.Name"
          @click="goto('Character Detail', { id: character.Id })"
        />
      </v-col>
    </v-row>
  </AppScaffold>
</template>
<script setup lang="ts">
import AppScaffold from '@/components/app/AppScaffold/AppScaffold.vue';
import { onMounted, ref } from 'vue';
import { getCollection } from '@/api/common';
import { getCharacterCardImageUrl } from '@/utils/assetUtils/url/characterCard';
import { goto } from '@/router';
import { Character } from '@/types/HWPL/Character';
import HwplCharacterCard from '@/components/hwpl/HwplCharacterCard.vue';

const characters = ref<Character[]>([]);

onMounted(async () => {
  characters.value = await getCollection('Characters');
});
</script>
