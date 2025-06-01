'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Sparkles } from 'lucide-react'
import GeneratedSuggestionCard from '@/components/GeneratedSuggestionCard'
import { getStoredProblems } from '@/lib/storage'
import { getAISuggestions } from '@/lib/ai'

export default function ProjectIdeas() {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)

  const generateSuggestions = async () => {
    setLoadingSuggestions(true)
    try {
      const problems = getStoredProblems()
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
    <div className="min-h-screen bg-gradient-to-b from-[#F2EEE3] to-[#7B9E82]/10">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-[#2D2D2A] hover:text-[#7B9E82]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="space-y-8">
          <Button
            className="w-full bg-gradient-to-r from-[#7B9E82]/70 via-[#7B9E82] to-[#7B9E82]/70 hover:opacity-90 transition-opacity text-[#F2EEE3]"
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
              <h2 className="text-2xl font-semibold text-[#2D2D2A]">
                Project Ideas
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
        </div>
      </div>
    </div>
  )
} 