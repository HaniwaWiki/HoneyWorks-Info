<template>
  <v-app>
    <AppNavigationBar />
    <v-main>
      <v-fade-transition :duration="100" mode="out-in">
        <router-view v-slot="{ Component }">
          <!--          <keep-alive>-->
          <component :is="Component" />
          <!--          </keep-alive>-->
        </router-view>
      </v-fade-transition>
    </v-main>
    <AppFooter />
    <AppSnackbar />
  </v-app>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './views/HelloWorld.vue';
import AppSnackbar from './components/app/AppSnackbar.vue';
import AppFooter from './components/app/AppFooter.vue';
import AppNavigationBar from './components/app/AppNavigationBar/AppNavigationBar.vue';
</script>
