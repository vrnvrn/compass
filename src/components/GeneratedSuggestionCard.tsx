// src/components/GeneratedSuggestionCard.tsx
'use client'

import { useState } from 'react'

export default function GeneratedSuggestionCard({ suggestion }: { suggestion: string }) {
  const [votes, setVotes] = useState({
    build: 0,
    sponsor: 0,
    need: 0,
  })

  const increment = (type: keyof typeof votes) => {
    setVotes((prev) => ({ ...prev, [type]: prev[type] + 1 }))
  }

  return (
    <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-md space-y-2">
      <p className="text-sm">{suggestion}</p>

      <div className="flex flex-wrap gap-2 text-sm">
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          onClick={() => increment('build')}
        >
          🛠 I'd build this ({votes.build})
        </button>
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          onClick={() => increment('sponsor')}
        >
          🙏 I'd sponsor this ({votes.sponsor})
        </button>
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          onClick={() => increment('need')}
        >
          🏢 I need this ({votes.need})
        </button>
      </div>
    </div>
  )
}