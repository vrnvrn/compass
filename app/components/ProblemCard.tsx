'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProblemBrief } from '@/lib/types'
import { Shield, CheckCircle2 } from 'lucide-react'

interface ProblemCardProps {
  problem: ProblemBrief
}

export default function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <Card className="overflow-hidden border-0 bg-white shadow-lg shadow-[#7B9E82]/10">
      <CardHeader className="pb-3 pt-6">
        <CardTitle className="flex items-center gap-2 text-xl">
          <span className="text-[#2D2D2A]">
            {problem.title}
          </span>
          {problem.verifiedDomain && (
            <span className="inline-flex items-center rounded-full bg-[#7B9E82]/10 px-2 py-1 text-xs font-medium text-[#7B9E82] ring-1 ring-inset ring-[#7B9E82]/20">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Verified Submitter
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-[#2D2D2A]">{problem.description}</p>
        
        <div className="rounded-lg bg-[#F2EEE3] px-4 py-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#7B9E82]" />
            <div className="flex-1 text-sm">
              <span className="text-[#2D2D2A]/70">Submitted by: </span>
              <span className="font-medium text-[#2D2D2A]">{problem.email}</span>
              {problem.verifiedDomain && (
                <div className="mt-1.5 flex items-center gap-1.5 text-[#7B9E82]">
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