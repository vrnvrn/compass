// src/lib/vlayer.ts
import { createVlayerClient } from '@vlayer/sdk'
import { getConfig, createContext } from '@vlayer/sdk/config'

// Validate required environment variables
const requiredEnvVars = {
  CHAIN_NAME: process.env.CHAIN_NAME || 'anvil',
  JSON_RPC_URL: process.env.JSON_RPC_URL || 'http://localhost:8545',
  PROVER_URL: process.env.PROVER_URL || 'http://localhost:3000',
  VLAYER_ENV: process.env.VLAYER_ENV || 'dev',
  EXAMPLES_TEST_PRIVATE_KEY: process.env.EXAMPLES_TEST_PRIVATE_KEY || '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
}

// Set environment variables
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!process.env[key]) {
    process.env[key] = value
  }
})

// Initialize SDK configuration
const config = getConfig()
const { proverUrl } = createContext(config)

// Create and export client
export const prover = createVlayerClient({
  url: proverUrl,
  token: process.env.VLAYER_API_TOKEN || '',
})