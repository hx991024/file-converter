export type ImageFormat = 'image/jpeg' | 'image/png' | 'image/webp'

export interface ImageFile {
  id: string
  file: File
  previewUrl: string
  targetFormat: ImageFormat
  status: 'pending' | 'processing' | 'done' | 'error'
}

export const convertImageFormat = (file: File, targetFormat: ImageFormat): Promise<Blob | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0)

        canvas.toBlob(
          (blob) => {
            resolve(blob)
          },
          targetFormat,
          0.9,
        )
      }
      img.onerror = reject
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  })
}
