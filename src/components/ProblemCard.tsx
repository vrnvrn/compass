'use client'

import { ProblemBrief } from '@/lib/types'

export default function ProblemCard({ problem }: { problem: ProblemBrief }) {
  return (
    <div className="border p-4 rounded-lg bg-white shadow space-y-2">
      <h3 className="text-lg font-semibold">{problem.title}</h3>
      <p>{problem.description}</p>
      <p className="text-sm text-gray-600">Submitted by: {problem.submittedBy}</p>

      {problem.emailProof?.verified && (
        <p className="text-sm text-green-600">
          ✅ Verified domain: <strong>{problem.emailProof.domain}</strong> (via Vlayer)
        </p>
      )}

      {problem.sponsorTrack && (
        <p className="text-sm text-gray-800">🎯 Sponsor/Track: <strong>{problem.sponsorTrack}</strong></p>
      )}
    </div>
  )
}