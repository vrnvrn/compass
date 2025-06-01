'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, PlusCircle, Sparkles } from 'lucide-react'
import ProblemCard from '@/components/ProblemCard'
import GeneratedSuggestionCard from '@/components/GeneratedSuggestionCard'
import { getStoredProblems } from '@/lib/storage'
import { getAISuggestions } from '@/lib/ai'
import { ProblemBrief } from '@/lib/types'

export default function Problems() {
  const [problems, setProblems] = useState<ProblemBrief[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)

  useEffect(() => {
    const loadedProblems = getStoredProblems()
    setProblems(loadedProblems)
  }, [])

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
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-gray-600 hover:text-indigo-600">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <Link href="/submit">
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90">
              <PlusCircle className="mr-2 h-4 w-4" />
              Submit Another Problem
            </Button>
          </Link>
        </div>

        <div className="space-y-8">
          {problems.length > 0 ? (
            <>
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

              <Button
                className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity"
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
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-6">
                No problems submitted yet
              </p>
              <Link href="/submit">
                <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Submit Your First Problem
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 