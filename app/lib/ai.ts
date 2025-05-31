import { ProblemBrief } from './types';

export async function getAISuggestions(problem: ProblemBrief): Promise<string[]> {
  try {
    const response = await fetch('/api/suggestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(problem),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate suggestions');
    }

    return data.suggestions;
  } catch (error) {
    console.error('Error generating suggestions:', error);
    return [
      `🚀 Project Title: "${problem.title} Solution Platform"\n💡 A community-driven platform that addresses ${problem.description} through innovative technology and local collaboration.`
    ];
  }
} 