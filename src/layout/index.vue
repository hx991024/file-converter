<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" permanent color="black" theme="dark">
      <v-list-item class="text-center" title="File Converter" subtitle="Pure Client-Side"></v-list-item>
      <v-divider></v-divider>
      <v-list nav>
        <v-list-item
          prepend-icon="mdi-image-outline"
          title="图片转换"
          value="image"
          to="/image-converter"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-file-code-outline"
          title="JSON转Excel"
          value="json"
          to="/json-converter"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="bg-gray-100">
      <v-container fluid shadow-none>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(true)
</script>

<style scoped></style>
