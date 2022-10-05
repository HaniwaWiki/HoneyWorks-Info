<template>
  <v-app-bar color="primary">
    <template #prepend>
      <v-app-bar-nav-icon @click="$emit('update:drawer', !drawer)" />
    </template>

    <v-app-bar-title>HoneyWorks Info</v-app-bar-title>

    <template #append>
      <v-app-bar-nav-icon icon="mdi-translate" />
      <v-app-bar-nav-icon icon="mdi-cog" />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
defineProps<{ drawer: boolean }>();

defineEmits(['update:drawer']);
</script>

<style scoped></style>
