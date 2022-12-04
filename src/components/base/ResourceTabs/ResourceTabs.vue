<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import type { Resource } from '@/components/base/ResourceTabs/Resource';
import { getCharacterCardImageUrl } from '@/utils/hwpl/CharacterCard/url';
import {
  getExtension,
  isAudio,
  isImage,
  isVideo,
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
  tab.value = props.resources[0]?.key;
});
</script>

<template>
  <div v-if="resources.length">
    <v-tabs v-model="tab" color="primary" center-active>
      <v-tab
        v-for="{ name, key, to } in resources"
        :key="key"
        :value="key"
      >
        {{ name }}
        <!--  only link of active tab is enable, preventing user from mis-touch -->
        <ButtonIconLink
          v-if="to"
          class="mr-n3"
          :to="to"
          :disabled="tab !== key"
        />
      </v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item
        v-for="{ key, url, options } in resources"
        :key="key"
        :value="key"
      >
        <!-- todo: support width option -->
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
        <AudioPlayer v-else-if="isAudio(url)" :url="url" controls />
        <div v-else>
          {{
            $t('components.resource_tabs.unsupported_media_type', [
              getExtension(url),
            ])
          }}
        </div>
      </v-window-item>
    </v-window>
  </div>
  <div v-else class="pa-5 d-flex align-center justify-center">
    <img
      :src="getCharacterCardImageUrl({ Id: 1997003 })"
      alt="puppet"
      width="48"
    >
    <div v-t="'components.resource_tabs.no_resource_available'" />
  </div>
</template>

<style lang="scss" scoped>
.resource-window {
  // never use static px in large-size component! use vh/vw instead
  max-height: 40vh;
}
</style>
