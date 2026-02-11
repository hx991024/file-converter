import { describe, it, expect } from 'vitest'
import { convertImageFormat } from '../image-processor'

describe('Image Processor Utils', () => {
  it('should be defined', () => {
    expect(convertImageFormat).toBeDefined()
  })
})
