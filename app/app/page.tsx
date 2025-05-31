'use client'

import { useState } from 'react'
import ProblemForm from '@/components/ProblemForm'
import ProblemCard from '@/components/ProblemCard'
import GeneratedSuggestionCard from '@/components/GeneratedSuggestionCard'
import { ProblemBrief } from '@/lib/types'
import { getAISuggestions } from '@/lib/ai'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-4">
            Building Local Impact
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hackathons drive innovation, strengthen communities, and create solutions for local needs. 
            Join us in building a better future through technology.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
          <div className="space-y-6">
            <div className="sticky top-8">
              <ProblemForm onSubmit={handleSubmit} />
              
              {problems.length > 0 && (
                <Button
                  className="w-full mt-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity"
                  onClick={generateSuggestions}
                  disabled={loadingSuggestions}
                  size="lg"
                >
                  {loadingSuggestions ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                      Generating Ideas...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate Hackathon Ideas
                    </div>
                  )}
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {problems.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                  Submitted Problems
                </h2>
                <div className="space-y-4">
                  {problems.map((p, idx) => (
                    <div key={idx} className="transform transition-all hover:scale-[1.02]">
                      <ProblemCard problem={p} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {suggestions.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  AI-Generated Project Ideas
                </h2>
                <div className="space-y-4">
                  {suggestions.map((s, idx) => (
                    <div key={idx} className="transform transition-all hover:scale-[1.02]">
                      <GeneratedSuggestionCard suggestion={s} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {problems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Submit a community problem to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 