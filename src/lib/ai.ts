// src/lib/ai.ts
export async function getAISuggestions(input: {
    title: string
    description: string
    sponsorTrack?: string
  }) {
    const res = await fetch('/api/suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
  
    if (!res.ok) throw new Error('Failed to fetch AI suggestions')
  
    const data = await res.json()
    return data.suggestions as string[]
  }  