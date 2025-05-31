'use client'

import { useState } from 'react'
import { ProblemBrief } from '@/lib/types'
// import { prover } from '@/lib/vlayer'
import { prover } from '@/lib/mockProver'

export default function ProblemForm({ onSubmit }: { onSubmit: (p: ProblemBrief) => void }) {
  const [form, setForm] = useState<Omit<ProblemBrief, 'emailProof'>>({
    title: '',
    description: '',
    submittedBy: '',
    sponsorTrack: '',
  })
  const [proof, setProof] = useState<ProblemBrief['emailProof']>()
  const [loading, setLoading] = useState(false)

  const generateProof = async () => {
    setLoading(true)
    try {
      const { proof } = await prover.requestEmailProof({
        email: form.submittedBy,
        statement: 'Verify your email to submit a problem to Compass',
      })

      const domain = form.submittedBy.split('@')[1]
      setProof({ domain, verified: true, proof })
    } catch (err) {
      alert('Failed to verify email. Try again or use a supported domain.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!proof) {
          alert('Please verify your email with Vlayer before submitting.')
          return
        }
        onSubmit({ ...form, emailProof: proof })
        setForm({ title: '', description: '', submittedBy: '', sponsorTrack: '' })
        setProof(undefined)
      }}
      className="space-y-4 border p-4 rounded-xl bg-white shadow"
    >
      <h2 className="text-xl font-semibold">Submit a Community Problem</h2>
      <input
        className="w-full border rounded p-2"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <textarea
        className="w-full border rounded p-2"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />
      <input
        className="w-full border rounded p-2"
        placeholder="Your Email"
        type="email"
        value={form.submittedBy}
        onChange={(e) => setForm({ ...form, submittedBy: e.target.value })}
        required
      />

      <button
        type="button"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={generateProof}
        disabled={loading}
      >
        {loading ? 'Verifying...' : 'Verify Email with Vlayer'}
      </button>

      {proof?.verified && (
        <p className="text-sm text-green-600 mt-1">
          ✅ Email proof generated for domain <strong>{proof.domain}</strong>
        </p>
      )}

      <input
        className="w-full border rounded p-2 mt-2"
        placeholder="Sponsor/Track (optional)"
        value={form.sponsorTrack}
        onChange={(e) => setForm({ ...form, sponsorTrack: e.target.value })}
      />

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Submit
      </button>
    </form>
  )
}