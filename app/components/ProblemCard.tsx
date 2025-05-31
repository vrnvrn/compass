'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProblemBrief } from '@/lib/types'
import { Shield, CheckCircle2 } from 'lucide-react'

interface ProblemCardProps {
  problem: ProblemBrief
}

export default function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <Card className="overflow-hidden border-0 bg-white shadow-lg shadow-gray-100/50">
      <CardHeader className="pb-3 pt-6">
        <CardTitle className="flex items-center gap-2 text-xl">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            {problem.title}
          </span>
          {problem.verifiedDomain && (
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Verified Submitter
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">{problem.description}</p>
        
        <div className="rounded-lg bg-gradient-to-r from-gray-50 to-gray-100/80 px-4 py-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-gray-400" />
            <div className="flex-1 text-sm">
              <span className="text-gray-500">Submitted by: </span>
              <span className="font-medium text-gray-900">{problem.email}</span>
              {problem.verifiedDomain && (
                <div className="mt-1.5 flex items-center gap-1.5 text-emerald-700">
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