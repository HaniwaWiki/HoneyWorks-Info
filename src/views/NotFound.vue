<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="4">
        <v-img :src="getCharacterCardImageUrl(1002006, 2)" />
      </v-col>
      <v-col cols="4" class="d-flex flex-column align-center justify-center">
        <div class="text-h3 mb-4">Page Not Found</div>
        <div class="text-center">The page you requested was not found.</div>
      </v-col>
      <v-col cols="4">
        <v-img :src="getCharacterCardImageUrl(1001015, 2)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { getCharacterCardImageUrl } from '@/utils/assetUtils/url/characterCard';
</script>
