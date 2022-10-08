<template>
  <AppScaffold>
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-img :src="characterImageUrl" />
        </v-card>
      </v-col>
    </v-row>
  </AppScaffold>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppScaffold from '@/components/app/AppScaffold/AppScaffold.vue';
import { getCharacterCardImageUrl } from '@/utils/assetUtils/url/characterCard';
import { useRoute } from 'vue-router';
import { useFirstOfCollection } from '@/composables/useCollection';

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
</script>
