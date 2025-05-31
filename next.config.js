/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Log environment variables during build
    console.log('Environment Variables during build:');
    console.log('VLAYER_ENV:', process.env.VLAYER_ENV);
    console.log('CHAIN_NAME:', process.env.CHAIN_NAME);
    console.log('JSON_RPC_URL:', process.env.JSON_RPC_URL);
    console.log('PROVER_URL:', process.env.PROVER_URL);

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        os: false,
      }
    }
    return config
  },
  env: {
    VLAYER_API_TOKEN: process.env.VLAYER_API_TOKEN,
    VLAYER_ENV: process.env.VLAYER_ENV,
    CHAIN_NAME: process.env.CHAIN_NAME,
    JSON_RPC_URL: process.env.JSON_RPC_URL,
    PROVER_URL: process.env.PROVER_URL,
    EXAMPLES_TEST_PRIVATE_KEY: process.env.EXAMPLES_TEST_PRIVATE_KEY,
  }
}

module.exports = nextConfig
