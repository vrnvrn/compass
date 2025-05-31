// src/components/GeneratedSuggestionCard.tsx
'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

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
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm space-y-4">
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]} 
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-xl font-semibold mb-2 text-gray-700" {...props} />,
            p: ({node, ...props}) => <p className="text-gray-600 mb-4" {...props} />,
          }}
        >
          {suggestion}
        </ReactMarkdown>
      </div>

      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
        <button
          className="px-3 py-1.5 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 
                     text-sm font-medium flex items-center gap-1.5 transition-colors"
          onClick={() => increment('build')}
        >
          🛠 I'd build this ({votes.build})
        </button>
        <button
          className="px-3 py-1.5 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 
                     text-sm font-medium flex items-center gap-1.5 transition-colors"
          onClick={() => increment('sponsor')}
        >
          🙏 I'd sponsor this ({votes.sponsor})
        </button>
        <button
          className="px-3 py-1.5 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 
                     text-sm font-medium flex items-center gap-1.5 transition-colors"
          onClick={() => increment('need')}
        >
          🏢 I need this ({votes.need})
        </button>
      </div>
    </div>
  )
}