import { ProblemBrief } from '@/lib/types'

export const storageKeys = {
  problems: 'compass_problems'
}

export const getStoredProblems = (): ProblemBrief[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(storageKeys.problems);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
}

export const storeProblems = (problems: ProblemBrief[]) => {
  try {
    localStorage.setItem(storageKeys.problems, JSON.stringify(problems));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
}

export const addProblem = (problem: ProblemBrief) => {
  const problems = getStoredProblems();
  problems.unshift(problem); // Add new problem at the beginning
  storeProblems(problems);
  return problems;
} 