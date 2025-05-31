'use client'

import { useState } from 'react'
import ProblemForm from '@/components/ProblemForm'
import ProblemCard from '@/components/ProblemCard'
import MockEmailProof from '@/components/MockEmailProof'
import { ProblemBrief } from '@/lib/types'

export default function Home() {
  const [problems, setProblems] = useState<ProblemBrief[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)

  const handleSubmit = async (p: ProblemBrief) => {
    setProblems([p, ...problems])

    setLoadingSuggestions(true)
    try {
      const res = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: p.title,
            description: p.description,
            sponsor: p.sponsorTrack,
          }),          
      })

      const data = await res.json()
      if (data && data.suggestions) {
        setSuggestions((prev) => [...data.suggestions, ...prev])
      }
    } catch (err) {
      console.error('Error generating suggestions:', err)
    } finally {
      setLoadingSuggestions(false)
    }
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

      {loadingSuggestions && (
        <p className="text-sm text-blue-600">💭 Generating suggestions...</p>
      )}

      {suggestions.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">💡 Suggested Hackathon Projects</h2>
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