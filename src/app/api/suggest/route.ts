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
  
  Suggest 3 creative, feasible hackathon project ideas that align with sponsors and help solve these problems.
  
  Markdown Format:
  🚀 Project Title
  🔍 Sponsor Track
  🧩 Idea (1–2 sentence description)
    `
  
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    })
  
    const content = response.choices[0].message.content || ''
    const suggestions = content
      .split('\n🚀')
      .filter(Boolean)
      .map(s => '🚀' + s.trim())
  
    return NextResponse.json({ suggestions })
  }