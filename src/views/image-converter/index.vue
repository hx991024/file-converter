<template>
  <v-container>
    <h1 class="text-h4 mb-6 font-bold">图片格式转换</h1>

    <v-card
      variant="outlined"
      class="p-12! border-dashed transition-colors flex flex-col items-center justify-center cursor-pointer text-center mb-6"
      @click="triggerSelect"
    >
      <v-file-input
        class="hidden!"
        ref="fileInputRef"
        v-model="rawFiles"
        label="选择或拖拽图片文件"
        multiple
        accept="image/*"
        @update:model-value="onFilesSelected"
      ></v-file-input>
      <v-icon icon="mdi-cloud-upload-outline" class="w-12 h-12 mb-4" />
      <h3 class="text-lg font-medium">点击或拖拽图片到此处</h3>
      <p class="text-sm text-muted-foreground mt-1">支持 JPG, PNG, WebP (纯前端处理)</p>
    </v-card>

    <v-row v-if="fileList.length > 0">
      <v-col v-for="item in fileList" :key="item.id" cols="12" md="6">
        <v-card variant="flat" border class="pa-4">
          <div class="d-flex align-center">
            <v-img :src="item.previewUrl" width="80" height="80" cover class="rounded mr-4 bg-grey-lighten-2"></v-img>

            <div class="grow">
              <div class="text-subtitle-1 font-weight-bold truncate" style="max-width: 200px">
                {{ item.file.name }}
              </div>
              <div class="text-caption text-grey">大小: {{ (item.file.size / 1024).toFixed(2) }} KB</div>
            </div>

            <v-select
              v-model="item.targetFormat"
              :items="formatOptions"
              label="目标格式"
              hide-details
              density="compact"
              class="mx-2"
              style="max-width: 120px"
            ></v-select>

            <v-btn
              :loading="item.status === 'processing'"
              :color="item.status === 'done' ? 'success' : 'black'"
              icon="mdi-download"
              variant="flat"
              @click="handleDownload(item)"
            ></v-btn>
          </div>

          <v-progress-linear
            v-if="item.status === 'processing'"
            indeterminate
            color="black"
            class="mt-2"
          ></v-progress-linear>
        </v-card>
      </v-col>
    </v-row>
    <v-btn
      v-if="fileList.length > 0"
      color="black"
      size="large"
      block
      class="mt-6"
      prepend-icon="mdi-auto-fix"
      @click="convertAll"
    >
      全部转换并下载
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import type { ImageFile, ImageFormat } from '@/utils/image-processor'
import { onUnmounted, ref } from 'vue'
import { useImageConverter } from '@/hooks/use-image-converter'

const { processFile, downloadBlob } = useImageConverter()
const fileInputRef = ref<HTMLInputElement>()
// 原始 File 对象数组
const rawFiles = ref<File[]>([])
// 处理后的业务对象数组
const fileList = ref<ImageFile[]>([])

const formatOptions: { title: string; value: ImageFormat }[] = [
  { title: 'JPG', value: 'image/jpeg' },
  { title: 'PNG', value: 'image/png' },
  { title: 'WEBP', value: 'image/webp' },
]

// 文件选择回调
const onFilesSelected = () => {
  const newItems: ImageFile[] = rawFiles.value.map((file) => ({
    id: crypto.randomUUID(),
    file: file,
    previewUrl: URL.createObjectURL(file), // 创建预览图
    targetFormat: 'image/jpeg',
    status: 'pending',
  }))
  fileList.value = [...fileList.value, ...newItems]
  rawFiles.value = [] // 清空输入框
}

// 触发隐藏的 input
const triggerSelect = () => fileInputRef.value?.click()

// 单个下载
const handleDownload = async (item: ImageFile) => {
  const blob = await processFile(item)
  if (blob) {
    const ext = item.targetFormat.split('/')[1]
    const fileName = item.file.name.split('.')[0] + `.${ext}`
    downloadBlob(blob, fileName)
  }
}

// 批量下载
const convertAll = async () => {
  for (const item of fileList.value) {
    if (item.status !== 'done') {
      await handleDownload(item)
    }
  }
}

// 内存清理：防止内存泄漏
onUnmounted(() => {
  fileList.value.forEach((item) => URL.revokeObjectURL(item.previewUrl))
})
</script>

<style scoped></style>
