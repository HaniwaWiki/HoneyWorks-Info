<template>
  <div v-if="resources.length">
    <v-tabs v-model="tab" color="primary" center-active>
      <v-tab v-for="{ name, to } in resources" :key="name" :value="name">
        {{ name }}
        <!--  only link of active tab is enable, preventing user from mis-touch -->
        <ButtonIconLink
          v-if="to"
          class="mr-n3"
          :to="to"
          :disabled="tab !== name"
        />
      </v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item
        v-for="{ name, url, options } in resources"
        :key="name"
        :value="name"
      >
        <!-- todo: support optional router link -->
        <!-- todo: gallery viewer -->
        <!-- todo: support other file types (audio, video) -->
        <v-img
          v-if="isImage(url)"
          :src="url"
          aspect-ratio="2"
          class="resource-window"
        />
        <VideoPlayer
          v-else-if="isVideo(url)"
          class="resource-window"
          :url="url"
          :controls="options?.controls"
          :muted="options?.muted"
          :loop="options?.loop"
          :autoplay="options?.autoplay"
        />
        <AudioPlayer v-else-if="isAudio(url)" :url="url" />
        <div v-else>Unsupported Media type: {{ getExtension(url) }}</div>
      </v-window-item>
    </v-window>
  </div>
  <div v-else class="pa-5 d-flex align-center justify-center">
    <img :src="getCharacterCardImageUrl({ Id: 1997003 })" width="48" />
    <div>No Resource Available</div>
  </div>
</template>

<script setup lang="ts">
import { Resource } from '@/components/base/ResourceTabs/Resource';
import { ref, watchEffect } from 'vue';
import { getCharacterCardImageUrl } from '@/utils/hwpl/CharacterCard/url';
import {
  isImage,
  isAudio,
  isVideo,
  getExtension,
} from '@/utils/fileExtensions';
import VideoPlayer from '@/components/base/VideoPlayer.vue';
import AudioPlayer from '@/components/base/AudioPlayer.vue';
import ButtonIconLink from '@/components/base/ButtonIconLink.vue';

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

<style lang="scss" scoped>
.resource-window {
  // never use static px in large-size component! use vh/vw instead
  max-height: 40vh;
}
</style>
