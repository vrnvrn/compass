'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface GeneratedSuggestionCardProps {
  suggestion: string
}

export default function GeneratedSuggestionCard({ suggestion }: GeneratedSuggestionCardProps) {
  const [votes, setVotes] = useState({ build: 0, sponsor: 0, need: 0 })

  return (
    <Card className="overflow-hidden border-0 bg-white shadow-lg shadow-[#7B9E82]/10">
      <CardContent className="space-y-4 p-6">
        <p className="whitespace-pre-wrap text-[#2D2D2A]">{suggestion}</p>
        
        <div className="flex gap-2 pt-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setVotes(v => ({ ...v, build: v.build + 1 }))}
            className="border-[#7B9E82]/20 text-[#2D2D2A] hover:bg-[#7B9E82]/10 hover:text-[#7B9E82] hover:border-[#7B9E82]/30"
          >
            🛠️ I'd build this ({votes.build})
          </Button>
          
          <Button 
            variant="outline"
            size="sm"
            onClick={() => setVotes(v => ({ ...v, sponsor: v.sponsor + 1 }))}
            className="border-[#7B9E82]/20 text-[#2D2D2A] hover:bg-[#7B9E82]/10 hover:text-[#7B9E82] hover:border-[#7B9E82]/30"
          >
            💰 I'd sponsor this ({votes.sponsor})
          </Button>
          
          <Button 
            variant="outline"
            size="sm"
            onClick={() => setVotes(v => ({ ...v, need: v.need + 1 }))}
            className="border-[#7B9E82]/20 text-[#2D2D2A] hover:bg-[#7B9E82]/10 hover:text-[#7B9E82] hover:border-[#7B9E82]/30"
          >
            💡 I need this ({votes.need})
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 