<template>
  <NavigationDrawer v-model:drawer="drawer" />
  <AppBar v-model:drawer="drawer" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppBar from './AppBar.vue';
import NavigationDrawer from './NavigationDrawer.vue';

const drawer = ref(false);
</script>

<style scoped></style>
