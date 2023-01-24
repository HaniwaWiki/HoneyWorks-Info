<script setup lang="ts">
import { getAlbumUrl } from '@/utils/hwpl/Album/url';

const props = defineProps<{
  albumId: number;
  thumbnailImageIdentifier: number;
  name: string;
}>();
const titleFontSize = '15px';
const cardName = props.name;
const cardId = props.albumId;
const imageId = props.thumbnailImageIdentifier;
</script>

<template>
  <v-card :to="{ name: 'Album Detail', params: { id: cardId } }">
    <div class="position-relative">
      <v-img :src="getAlbumUrl(imageId)" :aspect-ratio="16 / 9" />
    </div>
    <v-card-title :style="{ fontSize: titleFontSize }">
      {{ cardName }}
    </v-card-title>
  </v-card>
</template>
