import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ProblemBrief } from '@/lib/types';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Custom error class for better error handling
class SuggestionError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'SuggestionError';
  }
}

export async function POST(request: Request) {
  let problemData: Partial<ProblemBrief> = {};
  
  try {
    // Validate OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      throw new SuggestionError('OpenAI API key is not configured');
    }

    // Parse request body
    try {
      const problem: ProblemBrief = await request.json();
      problemData = problem;
    } catch (e) {
      throw new SuggestionError('Failed to parse request body', e);
    }

    // Validate required fields
    if (!problemData.title || !problemData.description) {
      throw new SuggestionError('Missing required fields', {
        missingFields: {
          title: !problemData.title,
          description: !problemData.description
        }
      });
    }

    const prompt = `Generate 2 innovative hackathon project ideas to solve this community problem:

PROBLEM CONTEXT
Title: ${problemData.title}
Description: ${problemData.description}

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

    try {
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

      const response = completion.choices[0]?.message?.content;
      
      if (!response) {
        throw new SuggestionError('No response received from OpenAI');
      }

      // Split by '---' to separate suggestions, then filter out any empty strings
      const suggestions = response.split('---')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      if (suggestions.length === 0) {
        throw new SuggestionError('No valid suggestions generated');
      }

      return NextResponse.json({ 
        success: true,
        suggestions 
      });

    } catch (e) {
      if (e instanceof OpenAI.APIError) {
        throw new SuggestionError('OpenAI API error', {
          status: e.status,
          message: e.message,
          type: e.type
        });
      }
      throw e;
    }

  } catch (error: unknown) {
    // Detailed error logging
    const errorObject = {
      errorName: error instanceof Error ? error.name : 'Unknown Error',
      errorMessage: error instanceof Error ? error.message : String(error),
      errorDetails: error instanceof SuggestionError ? error.details : undefined,
      problemData: {
        title: problemData.title,
        descriptionLength: problemData.description?.length,
      },
      openaiKeyExists: !!process.env.OPENAI_API_KEY
    };
    
    console.error('Error generating suggestions:', errorObject);

    // Return appropriate error response without suggestions
    return NextResponse.json(
      {
        success: false,
        error: error instanceof SuggestionError ? error.message : 'An unexpected error occurred',
        details: error instanceof SuggestionError ? error.details : undefined,
      },
      { status: error instanceof SuggestionError ? 400 : 500 }
    );
  }
} 