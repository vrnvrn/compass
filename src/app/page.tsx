'use client'

import { useState } from 'react'
import ProblemForm from '@/components/ProblemForm'
import ProblemCard from '@/components/ProblemCard'
import MockEmailProof from '@/components/MockEmailProof'
import { ProblemBrief } from '@/lib/types'

export default function Home() {
  const [problems, setProblems] = useState<ProblemBrief[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleSubmit = async (p: ProblemBrief) => {
    setProblems([p, ...problems])

    // MOCKED suggestion based on problem title
    const mockSuggestion = `Build a dApp that helps tackle "${p.title}" by enabling real-time reporting, community voting, and DAO-based funding.`
    setSuggestions([mockSuggestion, ...suggestions])
  }

  return (
    <main className="max-w-2xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">🧭 Compass: Hack for Local Needs</h1>

      <ProblemForm onSubmit={handleSubmit} />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Submitted Problems</h2>
        {problems.length === 0 ? (
          <p className="text-gray-500">No problems submitted yet.</p>
        ) : (
          problems.map((p, idx) => <ProblemCard key={idx} problem={p} />)
        )}
      </section>

      {suggestions.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">💡 Suggested Hackathon Projects (POC)</h2>
          {suggestions.map((s, idx) => (
            <div key={idx} className="p-4 border rounded bg-yellow-100 text-sm">
              {s}
            </div>
          ))}
        </section>
      )}

      <MockEmailProof />
    </main>
  )
}
