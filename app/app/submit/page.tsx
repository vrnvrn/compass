'use client'

import { useRouter } from 'next/navigation'
import ProblemForm from '@/components/ProblemForm'
import { ProblemBrief } from '@/lib/types'
import { addProblem } from '@/lib/storage'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function SubmitProblem() {
  const router = useRouter()

  const handleSubmit = (problem: ProblemBrief) => {
    addProblem(problem)
    router.push('/problems')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-gray-600 hover:text-indigo-600">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <ProblemForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  )
} 