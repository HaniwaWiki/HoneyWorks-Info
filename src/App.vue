<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { onMounted } from 'vue';
import AppSnackbar from './components/app/AppSnackbar.vue';
import AppFooter from './components/app/AppFooter.vue';
import AppNavigationBar from './components/app/AppNavigationBar/AppNavigationBar.vue';
import { useThemeColor } from './composables/useThemeColor';
import { checkForUpdates } from './utils/hwpl/Api/checkForUpdates';

useThemeColor();

onMounted(checkForUpdates);
</script>

<template>
  <v-app>
    <AppNavigationBar />
    <v-main>
      <router-view v-slot="{ Component }">
        <!--    fixme: bring transition back    -->
        <!--        <transition name="fade" :duration="100" mode="out-in"> -->
        <!--          <keep-alive> -->
        <component :is="Component" />
        <!--          </keep-alive> -->
        <!--        </transition> -->
      </router-view>
    </v-main>
    <AppFooter />
    <AppSnackbar />
  </v-app>
</template>
