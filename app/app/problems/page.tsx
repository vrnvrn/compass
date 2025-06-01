'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, PlusCircle, Sparkles } from 'lucide-react'
import ProblemCard from '@/components/ProblemCard'
import { getStoredProblems } from '@/lib/storage'
import { ProblemBrief } from '@/lib/types'

export default function Problems() {
  const [problems, setProblems] = useState<ProblemBrief[]>([])

  useEffect(() => {
    const loadedProblems = getStoredProblems()
    setProblems(loadedProblems)
  }, [])

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
          
          <div className="flex gap-4">
            <Link href="/ideas">
              <Button className="bg-gradient-to-r from-[#7B9E82]/80 via-[#7B9E82] to-[#7B9E82]/80 hover:opacity-90 text-[#F2EEE3]">
                <Sparkles className="mr-2 h-4 w-4" />
                View Project Ideas
              </Button>
            </Link>
            <Link href="/submit">
              <Button className="bg-gradient-to-r from-[#7B9E82]/80 via-[#7B9E82] to-[#7B9E82]/80 hover:opacity-90 text-[#F2EEE3]">
                <PlusCircle className="mr-2 h-4 w-4" />
                Submit Another Problem
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          {problems.length > 0 ? (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#2D2D2A]">
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
          ) : (
            <div className="text-center py-12">
              <p className="text-[#2D2D2A] text-lg mb-6">
                No problems submitted yet
              </p>
              <Link href="/submit">
                <Button className="bg-gradient-to-r from-[#7B9E82]/80 via-[#7B9E82] to-[#7B9E82]/80 hover:opacity-90 text-[#F2EEE3]">
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