<template>
  <div v-if="resources.length">
    <v-tabs v-model="tab" color="primary" center-active>
      <v-tab v-for="{ name } in resources" :key="name" :value="name">
        {{ name }}
      </v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item
        v-for="{ name, url } in resources"
        :key="name"
        :value="name"
      >
        <!-- todo: support optional router link -->
        <!-- todo: gallery viewer -->
        <!-- todo: support other file types (audio, video) -->
        <v-img :src="url" aspect-ratio="2" class="image" />
      </v-window-item>
    </v-window>
  </div>
  <div v-else class="pa-5 d-flex align-center justify-center">
    <img :src="getCharacterCardImageUrl({ Id: 1997003 })" width="48" />
    <div>No Resource Available</div>
  </div>
</template>

<script setup lang="ts">
import { Resource } from '@/components/base/ResourceTabs/types';
import { computed, ref, watchEffect } from 'vue';
import { getCharacterCardImageUrl } from '@/utils/hwpl/CharacterCard/url';

// props definition
const props = defineProps<{
  resources: Resource[];
}>();

const tab = ref('');

// when resource list update, reset tab to first item
watchEffect(() => {
  tab.value = props.resources[0]?.name;
});
</script>

<style lang="scss">
.image {
  max-height: 500px;
}
</style>
