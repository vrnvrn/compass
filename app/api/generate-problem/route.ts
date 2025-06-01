import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Custom error class for better error handling
class GenerationError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'GenerationError';
  }
}

export async function POST(request: Request) {
  try {
    // Validate OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      throw new GenerationError('OpenAI API key is not configured');
    }

    // Parse request body
    let { type, prompt, systemPrompt } = {} as any;
    try {
      const body = await request.json();
      ({ type, prompt, systemPrompt } = body);
    } catch (e) {
      throw new GenerationError('Failed to parse request body', e);
    }

    // Validate required fields
    if (!type || !prompt || !systemPrompt) {
      throw new GenerationError('Missing required fields', {
        missingFields: {
          type: !type,
          prompt: !prompt,
          systemPrompt: !systemPrompt
        }
      });
    }

    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: prompt
          }
        ],
        model: "gpt-4-turbo-preview",
        temperature: 0.7,
        max_tokens: 150,
      });

      const generatedText = completion.choices[0]?.message?.content?.trim();
      
      if (!generatedText) {
        throw new GenerationError('No response received from OpenAI');
      }

      return NextResponse.json({ 
        success: true,
        text: generatedText 
      });

    } catch (e) {
      if (e instanceof OpenAI.APIError) {
        throw new GenerationError('OpenAI API error', {
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
      errorDetails: error instanceof GenerationError ? error.details : undefined,
      openaiKeyExists: !!process.env.OPENAI_API_KEY
    };
    
    console.error('Error generating text:', errorObject);

    // Return appropriate error response
    return NextResponse.json(
      {
        success: false,
        error: error instanceof GenerationError ? error.message : 'An unexpected error occurred',
        details: error instanceof GenerationError ? error.details : undefined,
      },
      { status: error instanceof GenerationError ? 400 : 500 }
    );
  }
} 