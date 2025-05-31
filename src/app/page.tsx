/* --- src/app/page.tsx --- */
'use client'

import { useState } from 'react'
import ProblemForm from '@/components/ProblemForm'
import ProblemCard from '@/components/ProblemCard'
import GeneratedSuggestionCard from '@/components/GeneratedSuggestionCard'
import MockEmailProof from '@/components/MockEmailProof'
import { ProblemBrief } from '@/lib/types'
import { getAISuggestions } from '@/lib/ai'

export default function Home() {
  const [problems, setProblems] = useState<ProblemBrief[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)

  const handleSubmit = (p: ProblemBrief) => {
    setProblems([p, ...problems])
  }

  const handleGenerateIdeas = async () => {
    setLoadingSuggestions(true)
    try {
      const response = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problems }),
      })
      const data = await response.json()
      setSuggestions(data.suggestions || [])
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
        <h2 className="text-xl font-semibold">📋 Submitted Problems</h2>
        {problems.length === 0 ? (
          <p className="text-gray-500">No problems submitted yet.</p>
        ) : (
          problems.map((p, idx) => <ProblemCard key={idx} problem={p} />)
        )}

        {problems.length > 0 && (
          <button
            onClick={handleGenerateIdeas}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            ✨ Generate Hackathon Ideas
          </button>
        )}
      </section>

      {loadingSuggestions && (
        <p className="text-sm text-blue-600">💭 Generating suggestions...</p>
      )}

      {suggestions.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">💡 Suggested Hackathon Projects</h2>
          {suggestions.map((s, idx) => (
            <GeneratedSuggestionCard key={idx} suggestion={s} />
          ))}
        </section>
      )}

      <MockEmailProof />
    </main>
  )
}