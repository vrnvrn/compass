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
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl">
          {problem.title}
          {problem.verifiedDomain && (
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Verified Submitter
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-gray-700">{problem.description}</p>
        
        <div className="rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-gray-400" />
            <div className="flex-1 text-sm">
              <span className="text-gray-600">Submitted by: </span>
              <span className="font-medium text-gray-900">{problem.email}</span>
              {problem.verifiedDomain && (
                <div className="mt-1 flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span className="text-xs">
                    Verified {problem.verifiedDomain} domain through Vlayer
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 