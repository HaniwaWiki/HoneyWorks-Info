<!--  link that displays like a button  -->
<template>
  <v-btn
    ripple
    flat
    :prepend-icon="icon"
    class="link font-weight-medium text-primary"
    :style="{ display: inline ? 'inline-grid' : 'grid' }"
    :href="url"
    target="_blank"
  >
    {{ text }}
  </v-btn>
</template>

<script setup lang="ts">
defineProps<{
  inline?: boolean;
  icon: string;
  text: string;
  url: string;
}>();
</script>

<style lang="scss" scoped>
.link {
  display: inline-flex;
  margin: 4px;

  //align-items: center;
  justify-content: start;
  text-decoration: none;
  text-transform: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
}
</style>
