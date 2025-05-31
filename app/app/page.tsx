'use client'

import { useState } from 'react'
import ProblemForm from '@/components/ProblemForm'
import ProblemCard from '@/components/ProblemCard'
import GeneratedSuggestionCard from '@/components/GeneratedSuggestionCard'
import { ProblemBrief } from '@/lib/types'
import { getAISuggestions } from '@/lib/ai'
import { Button } from '@/components/ui/button'

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
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">🧭 Compass: Hack for Local Needs</h1>

      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <div className="space-y-6">
          <ProblemForm onSubmit={handleSubmit} />
          
          {problems.length > 0 && (
            <Button
              className="w-full"
              onClick={generateSuggestions}
              disabled={loadingSuggestions}
            >
              {loadingSuggestions ? 'Generating...' : '⚡ Generate Hackathon Ideas'}
            </Button>
          )}
        </div>

        <div className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">📚 Submitted Problems</h2>
            {problems.length === 0 ? (
              <p className="text-gray-500">No problems submitted yet.</p>
            ) : (
              problems.map((p, idx) => <ProblemCard key={idx} problem={p} />)
            )}
          </section>

          {suggestions.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">💡 Suggested Hackathon Projects</h2>
              {suggestions.map((s, idx) => (
                <GeneratedSuggestionCard key={idx} suggestion={s} />
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  )
} 