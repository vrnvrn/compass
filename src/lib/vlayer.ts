// src/lib/vlayer.ts
import { createWebClient } from '@vlayer/web'

export const prover = createWebClient({
  token: process.env.NEXT_PUBLIC_VLAYER_API_TOKEN!,
})