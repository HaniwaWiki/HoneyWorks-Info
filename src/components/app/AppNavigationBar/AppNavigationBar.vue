<script setup lang="ts">
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import AppBar from './AppBar.vue';
import NavigationDrawer from './NavigationDrawer.vue';

const { mobile } = useDisplay();
const drawer = ref(!mobile.value);
</script>

<template>
  <NavigationDrawer v-model:drawer="drawer" />
  <AppBar v-model:drawer="drawer" />
</template>

<style scoped></style>
