import { ProblemBrief } from '@/lib/types'

export default function ProblemCard({ problem }: { problem: ProblemBrief }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-gray-50 space-y-2">
      <h3 className="text-lg font-bold">{problem.title}</h3>
      <p className="text-gray-700">{problem.description}</p>
      <p className="text-sm text-gray-500">Submitted by: {problem.submittedBy}</p>

      {problem.emailProof?.verified && (
        <p className="text-sm text-green-600">
          🧾 Verified domain: <strong>{problem.emailProof.domain}</strong> (via Vlayer)
        </p>
      )}

      {problem.sponsorTrack && (
        <p className="text-sm text-blue-600">
          🎯 Sponsor/Track: <strong>{problem.sponsorTrack}</strong>
        </p>
      )}

      <div className="flex gap-2 mt-2">
        <button className="text-sm bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded">
          🛠 I'd build this
        </button>
        <button className="text-sm bg-green-100 hover:bg-green-200 px-2 py-1 rounded">
          💸 I'd sponsor this
        </button>
      </div>
    </div>
  )
}