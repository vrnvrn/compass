// src/app/api/suggest/route.ts
import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const { title, description, sponsorTrack } = await req.json()

  const prompt = `A community submitted the following problem for a hackathon:
Title: ${title}
Description: ${description}
Sponsor Track: ${sponsorTrack || 'N/A'}

Suggest 3 creative hackathon project ideas teams could build to help solve this.`

  const chat = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  })

  const suggestions = chat.choices[0].message.content
    ?.split('\n')
    .filter((line) => line.trim() !== '')
    .slice(0, 3) || ['Idea 1', 'Idea 2', 'Idea 3']

  return NextResponse.json({ suggestions })
}