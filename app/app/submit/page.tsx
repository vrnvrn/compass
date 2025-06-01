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
    <div className="min-h-screen bg-gradient-to-b from-[#F2EEE3] to-[#7B9E82]/10">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-[#2D2D2A] hover:text-[#7B9E82]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
            Note: The ZK email verification is currently simulated for demonstration purposes. Real zero-knowledge proof verification coming soon!
          </div>
          <ProblemForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  )
} 