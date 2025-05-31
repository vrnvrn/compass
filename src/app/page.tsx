'use client'

import { useState } from 'react'
import ProblemForm from '@/components/ProblemForm'
import ProblemCard from '@/components/ProblemCard'
import GeneratedSuggestionCard from '@/components/GeneratedSuggestionCard'
import { ProblemBrief } from '@/lib/types'
import { getAISuggestions } from '@/lib/ai'

export default function Home() {
  const [problems, setProblems] = useState<ProblemBrief[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)

  const handleSubmit = (p: ProblemBrief) => {
    setProblems([p, ...problems])
  }

  const generateSuggestions = async () => {
    setLoadingSuggestions(true)
    try {
      const allSuggestions: string[] = []
      for (const problem of problems) {
        const sug = await getAISuggestions(problem)
        allSuggestions.push(...sug)
      }
      setSuggestions(allSuggestions)
    } catch (err) {
      console.error('Suggestion generation failed:', err)
    } finally {
      setLoadingSuggestions(false)
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">🧭 Compass: Hack for Local Needs</h1>

      <ProblemForm onSubmit={handleSubmit} />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">📚 Submitted Problems</h2>
        {problems.length === 0 ? (
          <p className="text-gray-500">No problems submitted yet.</p>
        ) : (
          problems.map((p, idx) => <ProblemCard key={idx} problem={p} />)
        )}
      </section>

      {problems.length > 0 && (
        <button
          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
          onClick={generateSuggestions}
          disabled={loadingSuggestions}
        >
          {loadingSuggestions ? 'Generating...' : '⚡ Generate Hackathon Ideas'}
        </button>
      )}

      {suggestions.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">💡 Suggested Hackathon Projects</h2>
          {suggestions.map((s, idx) => (
            <GeneratedSuggestionCard key={idx} suggestion={s} />
          ))}
        </section>
      )}
    </main>
  )
}