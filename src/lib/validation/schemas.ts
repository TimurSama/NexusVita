import { z } from 'zod'

// News post validation
export const newsPostSchema = z.object({
  postUrl: z.string().url('Некорректный URL поста'),
  newsPostId: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
})

// Partner application validation
export const partnerApplicationSchema = z.object({
  // Add your partner application fields here
})
