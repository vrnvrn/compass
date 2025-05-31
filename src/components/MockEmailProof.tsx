'use client'

import { useState } from 'react'

export default function MockEmailProof() {
  const [email, setEmail] = useState('')
  const [proofComplete, setProofComplete] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Fake "proof" logic
    setTimeout(() => setProofComplete(true), 1500)
  }

  return (
    <div className="p-6 border rounded-lg shadow space-y-4">
      <h2 className="text-xl font-semibold">Email Proof (Mocked)</h2>
      {proofComplete ? (
        <p className="text-green-600">✅ Proof complete! Email ownership verified.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <label className="block">
            Email address:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </label>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Simulate Proof
          </button>
        </form>
      )}
    </div>
  )
}