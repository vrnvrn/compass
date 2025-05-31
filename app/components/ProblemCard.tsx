'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProblemBrief } from '@/lib/types'
import { Shield, CheckCircle2 } from 'lucide-react'

interface ProblemCardProps {
  problem: ProblemBrief
}

export default function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {problem.title}
          {problem.verifiedDomain && (
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Verified
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-gray-700">{problem.description}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Shield className="h-4 w-4" />
          <span>
            Submitted by: <span className="font-medium">{problem.email}</span>
            {problem.verifiedDomain && (
              <span className="ml-1 text-emerald-600">
                ({problem.verifiedDomain})
              </span>
            )}
          </span>
        </div>
        {problem.verifiedDomain && (
          <div className="rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
            <p className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              Email verified through Vlayer's domain verification system
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 