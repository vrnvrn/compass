'use client'

export default function GeneratedSuggestionCard({ suggestion }: { suggestion: string }) {
  return (
    <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-md space-y-2 text-sm">
      <div dangerouslySetInnerHTML={{ __html: suggestion }} />
      <div className="flex gap-2 pt-2">
        <button className="text-xs bg-green-100 hover:bg-green-200 text-green-800 px-2 py-1 rounded">🚀 I'd build this</button>
        <button className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded">💸 I'd sponsor this</button>
        <button className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-800 px-2 py-1 rounded">🙏 I need this</button>
      </div>
    </div>
  )
}