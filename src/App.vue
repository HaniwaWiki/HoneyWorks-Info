<template>
  <v-app>
    <AppNavigationBar />
    <v-main>
      <div>
        <router-view v-slot="{ Component }">
          <v-fade-transition :duration="100" mode="out-in">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </v-fade-transition>
        </router-view>
      </div>
      <!--      <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />-->
    </v-main>
    <AppFooter />
    <AppSnackbar />
  </v-app>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './views/HelloWorld.vue';
import AppSnackbar from './components/AppSnackbar.vue';
import AppFooter from './components/AppFooter.vue';
import AppNavigationBar from './components/AppNavigationBar/AppNavigationBar.vue';
</script>
