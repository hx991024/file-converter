import { ref } from 'vue'
import JSZip from 'jszip'
import type { ImageFile } from '@/utils/image-processor'
import { convertImageFormat } from '@/utils/image-processor'

export const useImageConverter = () => {
  const isProcessing = ref(false)

  const processFile = async (item: ImageFile): Promise<Blob | null> => {
    item.status = 'processing'
    try {
      const result = await convertImageFormat(item.file, item.targetFormat)
      if (result) {
        item.status = 'done'
        return result
      }
      throw new Error('Conversion failed')
    } catch (error) {
      item.status = 'error'
      return null
    }
  }

  const downloadBlob = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    link.click()
    // 释放
    URL.revokeObjectURL(url)
  }

  const downloadZip = async (items: ImageFile[]) => {
    const zip = new JSZip()
    isProcessing.value = true

    // 使用 Promise.all 并行处理所有文件
    const promises = items.map(async (item) => {
      const blob = await convertImageFormat(item.file, item.targetFormat)
      if (blob) {
        const ext = item.targetFormat.split('/')[1]
        const fileName = `${item.file.name.split('.')[0]}.${ext}`
        zip.file(fileName, blob)
      }
    })

    await Promise.all(promises)

    // 生成 zip
    const content = await zip.generateAsync({ type: 'blob' })

    // 使用之前封装的下载方法
    downloadBlob(content, `converted_images_${Date.now()}.zip`)
    isProcessing.value = false
  }

  return { isProcessing, processFile, downloadBlob, downloadZip }
}
