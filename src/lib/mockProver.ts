// src/lib/mockProver.ts

export const prover = {
    requestEmailProof: async ({ email, statement }: { email: string; statement: string }) => {
      console.log('🔧 Mock email proof requested:', email, '| Statement:', statement)
      // Simulate delay
      await new Promise((res) => setTimeout(res, 1000))
  
      const domain = email.split('@')[1] || 'unknown.com'
  
      return {
        proof: {
          fakeProof: true,
          timestamp: new Date().toISOString(),
        },
        domain,
        verified: true,
      }
    },
  }  