<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent color="black" theme="dark">
      <Logo :rail="rail" />

      <v-divider />

      <!-- 直接使用 Sidebar -->
      <Sidebar />
    </v-navigation-drawer>

    <v-app-bar elevation="1">
      <v-btn icon="mdi-menu" variant="text" @click="rail = !rail" />
    </v-app-bar>

    <v-main class="bg-gray-100">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './components/sidebar.vue'
import Logo from './components/logo.vue'

const drawer = ref(true)
const rail = ref(false) // 折叠模式
</script>

<style scoped></style>
