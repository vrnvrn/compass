'use client'

import { useState } from 'react'
import ProblemForm from '@/components/ProblemForm'
import ProblemCard from '@/components/ProblemCard'
import { ProblemBrief } from '@/lib/types'

export default function Home() {
  const [problems, setProblems] = useState<ProblemBrief[]>([])

  return (
    <main className="max-w-2xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">Compass: Hack Local Needs</h1>
      <ProblemForm onSubmit={(p) => setProblems([p, ...problems])} />
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Submitted Problems</h2>
        {problems.length === 0 ? (
          <p className="text-gray-500">No problems submitted yet.</p>
        ) : (
          problems.map((p, idx) => <ProblemCard key={idx} problem={p} />)
        )}
      </section>
    </main>
  )
}