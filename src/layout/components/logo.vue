<script setup lang="ts">
defineProps<{
  rail: boolean
}>()
</script>

<template>
  <div class="px-3 py-4">
    <div class="flex items-center">
      <!-- 固定宽度图标容器 -->
      <div class="w-8 flex justify-center">
        <v-icon size="26"> mdi-file-sync-outline </v-icon>
      </div>

      <!-- 文字区域 -->
      <div class="overflow-hidden" :class="rail ? 'w-0 opacity-0 ml-0' : 'w-auto opacity-100 ml-3'">
        <div class="flex flex-col leading-tight whitespace-nowrap">
          <span class="text-sm font-semibold"> File Converter </span>
          <span class="text-xs opacity-70"> Pure Client-Side </span>
        </div>
      </div>
    </div>
  </div>
</template>
