import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ProblemBrief } from '@/lib/types';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  let problemData: Partial<ProblemBrief> = {};
  
  try {
    const problem: ProblemBrief = await request.json();
    problemData = problem;

    const prompt = `Generate 2 innovative hackathon project ideas to solve this community problem:

PROBLEM CONTEXT
Title: ${problem.title}
Description: ${problem.description}

For each solution, provide a response in exactly this format (including emojis):

🚀 Project Title: [Concise, catchy title]

💡 Description: [2-3 sentences explaining the core solution]

🛠️ Tech Stack:
• [Key technology/framework 1]
• [Key technology/framework 2]
• [Key technology/framework 3]

🎯 Impact:
• [Primary impact point]
• [Secondary impact point]

---

Make each suggestion:
1. Technically feasible for a hackathon (2-3 days of coding)
2. Focused on real community impact
3. Leveraging modern technologies

Generate exactly 2 suggestions with a clear separation between them.`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a hackathon project ideation expert who specializes in generating innovative technical solutions for community problems. Your suggestions should be specific, technically detailed, and focused on real impact. Always maintain the exact format specified, including all emojis and bullet points."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-4-turbo-preview",
      temperature: 0.7,
      max_tokens: 1500,
    });

    const response = completion.choices[0]?.message?.content || '';
    // Split by '---' to separate suggestions, then filter out any empty strings
    const suggestions = response.split('---')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Error generating suggestions:', error);
    // Fallback suggestion in the same format as the prompt
    return NextResponse.json(
      { 
        error: 'Failed to generate suggestions',
        suggestions: [`🚀 Project Title: "${problemData.title || 'Community'} Solution Platform"

💡 Description: A community-driven platform that addresses ${problemData.description || 'local needs'} through innovative technology and local collaboration.

🛠️ Tech Stack:
• Next.js for the frontend
• Node.js backend
• MongoDB for data storage

🎯 Impact:
• Direct community engagement
• Measurable local improvement`]
      },
      { status: 500 }
    );
  }
} 