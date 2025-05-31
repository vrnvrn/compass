// src/app/api/suggest/route.ts
import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'
import sponsors from '@/lib/sponsors_tracks.json'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
    const body = await req.json()
  
    const problems = body.problems || []
    const sponsorContext = JSON.stringify(sponsors, null, 2)
  
    const prompt = `
You are an expert hackathon assistant. Based on these sponsor tracks and themes:

${sponsorContext}

And the following local community problems:

${problems.map((p: any, i: number) => `${i + 1}. "${p.title}" - ${p.description}`).join('\n')}

Suggest 1 creative, feasible hackathon project idea that aligns with 1-3 sponsors to help solve one of these problems.

Format your response in markdown like this:

# 🚀 [Project Title]

## 🔍 Sponsor Track
[Sponsor names and tracks]

## 💡 Project Idea
[2-3 sentence description of the project, its technical components, and how it helps solve the problem]
`
  
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    })
  
    const content = response.choices[0].message.content || ''
    const suggestions = [content.trim()]
  
    return NextResponse.json({ suggestions })
  }